
var simpleevm = require('..');

exports['execute push one byte'] = function (test) {
	var status = simpleevm.execute("6001");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 1);
}

exports['execute push two bytes'] = function (test) {
	var status = simpleevm.execute("610102");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 258);
}


exports['execute push three bytes'] = function (test) {
	var status = simpleevm.execute("62010000");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 256 * 256);
}

exports['execute two pushes and one add'] = function (test) {
	var status = simpleevm.execute("6001600201");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 3);
}

exports['execute two pushes and one subtract'] = function (test) {
	var status = simpleevm.execute("6001600203");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 1);
}

exports['execute two pushes and one multiply'] = function (test) {
	var status = simpleevm.execute("6002600302");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 6);
}

exports['execute push and dup'] = function (test) {
	var status = simpleevm.execute("600180");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 2);
	test.equal(status.stack.pop(), 1);
	test.equal(status.stack.pop(), 1);
}

exports['execute two pushes and swap|'] = function (test) {
	var status = simpleevm.execute("6001600290");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 2);
	test.equal(status.stack.pop(), 1);
	test.equal(status.stack.pop(), 2);
}



