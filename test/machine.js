
var machine = require('../lib/machine');

exports['create with empty stack'] = function (test) {
	var mach = machine();	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 0);
}

exports['create with initial state'] = function (test) {
	var mach = machine({ address: '0x01020304' });	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 0);
	test.ok(state.address);
	test.equal(state.address, '0x01020304');
}

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

exports['execute address'] = function (test) {
	var mach = machine({ address: 0x01020304 });
	
	mach.execute(Buffer.from("30", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.address, 0x01020304);
}

exports['execute balance'] = function (test) {
	var mach = machine({ balance: 0x01020304 });
	
	mach.execute(Buffer.from("31", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.balance, 0x01020304);
}

