
var stack = require('./stack');

function Machine() {
	var state = {};
	
	state.stack = stack();
	
	this.state = function () { return state; };
	
	this.execute = function (opcodes) {
		var pc = 0;
		var l = opcodes.length;
		
		while (pc < l) {
			if (opcodes[pc] === 0x60) {
				pc++;
				state.stack.push(opcodes[pc]);
			}
			else if (opcodes[pc] === 0x61) {
				pc++;
				state.stack.push((opcodes[pc] << 8) + opcodes[pc+1]);
				pc++;
			}
			
			pc++;
		}
	}
}

module.exports = function () {
	return new Machine();
};

