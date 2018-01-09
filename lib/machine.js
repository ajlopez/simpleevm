
var stack = require('./stack');

function Machine() {
	var state = {};
	
	state.stack = stack();
	
	this.state = function () { return state; };
	
	this.execute = function (opcodes) {
		var pc = 0;
		var l = opcodes.length;
		
		while (pc < l) {
			if (opcodes[pc] >= 0x60 && opcodes[pc] < 0x80) {
				var nbytes = opcodes[pc] - 0x60 + 1;
				pc++;
				state.stack.push(bytesToValue(opcodes, pc, nbytes));
				pc += nbytes;
				continue;
			}
			
			if (opcodes[pc] === 0x80)
				state.stack.push(state.stack.peek(0));
			else if (opcodes[pc] === 0x01) {
				var value1 = state.stack.pop();
				var value2 = state.stack.pop();
				
				state.stack.push(value1 + value2);
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

