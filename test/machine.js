
var machine = require('../lib/machine');

exports['execute push byte'] = function (test) {
	var mach = machine();
	
	mach.execute(Buffer.from("6001", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 1);
}

