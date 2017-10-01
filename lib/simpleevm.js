
var machine = require('./machine');

function executeCode(code) {
	var opcodes = Buffer.from(code, 'hex');
	var mach = machine();
	
	mach.execute(opcodes);
	
	return mach.state();
}

module.exports = {
	execute: executeCode
}