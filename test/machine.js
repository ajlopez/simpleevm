
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

exports['execute push two bytes'] = function (test) {
	var mach = machine();
	
	mach.execute(Buffer.from("610102", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x0102);
}

exports['execute push three bytes'] = function (test) {
	var mach = machine();
	
	mach.execute(Buffer.from("62010203", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x010203);
}
