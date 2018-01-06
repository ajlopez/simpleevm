
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
				pc++
				state.stack.push(bytesToValue(opcodes, pc, nbytes));
				pc += nbytes;
				continue;
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

