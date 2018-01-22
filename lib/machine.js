
var stack = require('./stack');

var fns = [];

fns[0x01] = addOp;

function addOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 + value2);
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
				fns[opcodes[pc]](state, opcodes, pc);
			}
			else if (opcodes[pc] >= 0x60 && opcodes[pc] < 0x80) {
				var nbytes = opcodes[pc] - 0x60 + 1;
				pc++;
				state.stack.push(bytesToValue(opcodes, pc, nbytes));
				pc += nbytes;
				continue;
			}
			
			if (opcodes[pc] >= 0x80 && opcodes[pc] <= 0x8f) {
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
			else if (opcodes[pc] === 0x02) {
				var value1 = state.stack.pop();
				var value2 = state.stack.pop();
				
				state.stack.push(value1 * value2);
			}
			else if (opcodes[pc] === 0x03) {
				var value1 = state.stack.pop();
				var value2 = state.stack.pop();
				
				state.stack.push(value1 - value2);
			}
			
			pc++;
		}
	}
	
	function bytesToValue(bytes, offset, length) {
		var value = 0;
		
		for (var k = 0; k < length; k++) {
			value <<= 8;
			value += bytes[offset + k]
		}
		
		return value;
	}
}

module.exports = function () {
	return new Machine();
};

