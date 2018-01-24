
var stack = require('./stack');

var fns = [];

fns[0x01] = addOp;
fns[0x02] = mulOp;
fns[0x03] = subOp;

for (var k = 0; k < 32; k++)
	fns[0x60 + k] = pushOp;

function addOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 + value2);
}

function mulOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 * value2);
}

function subOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 - value2);
}

function pushOp(state, opcodes, pc) {
	var nbytes = opcodes[pc] - 0x60 + 1;

	state.stack.push(bytesToValue(opcodes, pc + 1, nbytes));

	return nbytes;
}

function bytesToValue(bytes, offset, length) {
	var value = 0;
	
	for (var k = 0; k < length; k++) {
		value <<= 8;
		value += bytes[offset + k]
	}
	
	return value;
}

function Machine() {
	var state = {};
	
	state.stack = stack();
	
	this.state = function () { return state; };
	
	this.execute = function (opcodes) {
		var pc = 0;
		var l = opcodes.length;
		
		while (pc < l) {
			if (fns[opcodes[pc]]) {
				var dpc = fns[opcodes[pc]](state, opcodes, pc);
				
				if (dpc)
					pc += dpc;
			}
			else if (opcodes[pc] >= 0x80 && opcodes[pc] <= 0x8f) {
				var source = opcodes[pc] - 0x80;
				state.stack.push(state.stack.peek(source));
			}
			else if (opcodes[pc] >= 0x90 && opcodes[pc] <= 0x9f) {
				var target = opcodes[pc] - 0x90 + 1;
				var top = state.stack.size() - 1;
				var value1 = state.stack.peek(0);
				var value2 = state.stack.peek(target);
				state.stack.put(top - target, value1);
				state.stack.put(top, value2);				
			}
			
			pc++;
		}
	}	
}

module.exports = function () {
	return new Machine();
};

