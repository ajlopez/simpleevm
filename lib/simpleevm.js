
const machine = require('./machine');

function executeCode(code, state) {
	const opcodes = Buffer.from(code, 'hex');
	const mach = machine(state);
	
	mach.execute(opcodes);
	
	return mach.state();
}

module.exports = {
	execute: executeCode
}

