
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
			
			pc++;
		}
	}
}

module.exports = function () {
	return new Machine();
};

