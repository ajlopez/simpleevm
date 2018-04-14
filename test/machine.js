
var machine = require('../lib/machine');

exports['create with empty stack'] = function (test) {
	var mach = machine();	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 0);
	test.equal(state.gasused, 0);
}

exports['create with initial state'] = function (test) {
	var mach = machine({ address: '0x01020304' });	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 0);
	test.ok(state.address);
	test.equal(state.address, '0x01020304');
	test.equal(state.gasused, 0);
}

exports['execute push byte'] = function (test) {
	var mach = machine();
	
	mach.execute(Buffer.from("6001", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 1);
	test.equal(state.gasused, 3);
}

exports['execute push two bytes'] = function (test) {
	var mach = machine();
	
	mach.execute(Buffer.from("610102", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x0102);
	test.equal(state.gasused, 3);
}

exports['execute push three bytes'] = function (test) {
	var mach = machine();
	
	mach.execute(Buffer.from("62010203", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x010203);
	test.equal(state.gasused, 3);
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
	test.equal(state.gasused, 2);
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
	test.equal(state.gasused, 20);
}

exports['execute origin'] = function (test) {
	var mach = machine({ origin: 0x01020304 });
	
	mach.execute(Buffer.from("32", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.origin, 0x01020304);
	test.equal(state.gasused, 20);
}

exports['execute caller'] = function (test) {
	var mach = machine({ caller: 0x01020304 });
	
	mach.execute(Buffer.from("33", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.caller, 0x01020304);
	test.equal(state.gasused, 20);
}

exports['execute number'] = function (test) {
	var mach = machine({ number: 0x01020304 });
	
	mach.execute(Buffer.from("43", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.number, 0x01020304);
}

exports['execute timestamp'] = function (test) {
	var mach = machine({ timestamp: 0x01020304 });
	
	mach.execute(Buffer.from("42", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.timestamp, 0x01020304);
}

exports['execute difficulty'] = function (test) {
	var mach = machine({ difficulty: 0x01020304 });
	
	mach.execute(Buffer.from("44", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.difficulty, 0x01020304);
}

exports['execute gas limit'] = function (test) {
	var mach = machine({ gaslimit: 0x01020304 });
	
	mach.execute(Buffer.from("45", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.gaslimit, 0x01020304);
}

exports['execute coinbase'] = function (test) {
	var mach = machine({ coinbase: 0x01020304 });
	
	mach.execute(Buffer.from("41", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.coinbase, 0x01020304);
}

exports['execute callvalue'] = function (test) {
	var mach = machine({ callvalue: 0x01020304 });
	
	mach.execute(Buffer.from("34", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.callvalue, 0x01020304);
}

exports['execute calldatasize'] = function (test) {
	var mach = machine({ calldata: [ 0x01, 0x02, 0x03, 0x04 ] });
	
	mach.execute(Buffer.from("36", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 4);
	test.deepEqual(state.calldata, [ 0x01, 0x02, 0x03, 0x04 ]);
}

exports['execute calldatasize with null data'] = function (test) {
	var mach = machine();
	
	mach.execute(Buffer.from("36", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0);
}

exports['execute calldataload'] = function (test) {
	var data = [ 0x01, 0x02, 0x03, 0x04 ];
	var mach = machine({ calldata: data });
	
	mach.execute(Buffer.from("600135", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	
	var result = state.stack.get(0);

	test.ok(Array.isArray(result));
	test.equal(result.length, 32);
	
	for (var k = 0; k < data.length - 1; k++)
		test.equal(result[k], data[k + 1]);
	
	for (; k < result.length; k++)
		test.equal(result[k], 0);
	
	test.deepEqual(state.calldata, data);
}

exports['execute calldataload with null call data'] = function (test) {
	var mach = machine();
	mach.execute(Buffer.from("600135", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	
	var result = state.stack.get(0);

	test.ok(Array.isArray(result));
	test.equal(result.length, 32);
	
	for (k = 0; k < result.length; k++)
		test.equal(result[k], 0);
}

exports['execute gas price'] = function (test) {
	var mach = machine({ gasprice: 0x01020304 });
	
	mach.execute(Buffer.from("3a", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.get(0), 0x01020304);
	test.equal(state.gasprice, 0x01020304);
}

exports['execute pop'] = function (test) {
	var mach = machine();
	mach.execute(Buffer.from("600150", 'hex'));
	
	var state = mach.state();
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 0);
	
	test.equal(state.gasused, 3 + 3);
}

