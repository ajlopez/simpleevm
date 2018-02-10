
var machine = require('./machine');

function executeCode(code, state) {
	var opcodes = Buffer.from(code, 'hex');
	var mach = machine(state);
	
	mach.execute(opcodes);
	
	return mach.state();
}

module.exports = {
	execute: executeCode
}