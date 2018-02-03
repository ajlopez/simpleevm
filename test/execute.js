
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

exports['execute two pushes and divide'] = function (test) {
	var status = simpleevm.execute("6002600604");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 3);
}

exports['execute div with zero divisor'] = function (test) {
	var status = simpleevm.execute("6000600604");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 0);
}

exports['execute two pushes and mod'] = function (test) {
	var status = simpleevm.execute("6003600506");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 2);
}

exports['execute mod with zero divisor'] = function (test) {
	var status = simpleevm.execute("6000600606");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 0);
}

exports['execute two pushes and exp'] = function (test) {
	var status = simpleevm.execute("600360020a");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 8);
}

exports['execute push and dup'] = function (test) {
	var status = simpleevm.execute("600180");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 2);
	test.equal(status.stack.pop(), 1);
	test.equal(status.stack.pop(), 1);
}

exports['execute two pushes and swap1'] = function (test) {
	var status = simpleevm.execute("6001600290");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 2);
	test.equal(status.stack.pop(), 1);
	test.equal(status.stack.pop(), 2);
}

exports['execute three pushes and swap2'] = function (test) {
	var status = simpleevm.execute("60016002600391");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 3);
	test.equal(status.stack.pop(), 1);
	test.equal(status.stack.pop(), 2);
	test.equal(status.stack.pop(), 3);
}

exports['execute n pushes and swap n - 1'] = function (test) {
	for (var k = 0; k < 16; k++) {
		var code = '';

		for (var j = 0; j < k + 2; j++)
			if (j >= 16)
				code += '60' + j.toString(16);
			else
				code += '600' + j.toString(16);
	
		code += (k + 9 * 16).toString(16);

		var status = simpleevm.execute(code);
	
		test.ok(status);
		test.ok(status.stack);
		test.equal(status.stack.size(), k + 2);
		test.equal(status.stack.peek(0), 0);
		test.equal(status.stack.peek(k + 1), k + 1);
	}
}

exports['execute n pushes and dup n'] = function (test) {
	for (var k = 0; k < 16; k++) {
		var code = '';

		for (var j = 0; j < k + 1; j++)
			if (j >= 16)
				code += '60' + j.toString(16);
			else
				code += '600' + j.toString(16);
	
		code += (k + 8 * 16).toString(16);

		var status = simpleevm.execute(code);
	
		test.ok(status);
		test.ok(status.stack);
		test.equal(status.stack.size(), k + 2);
		test.equal(status.stack.peek(0), 0);
		test.equal(status.stack.peek(1), k);
	}
}

exports['execute two pushes and lt given true'] = function (test) {
	var status = simpleevm.execute("6002600110");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 1);
}

exports['execute two pushes and lt given false'] = function (test) {
	var status = simpleevm.execute("6002600310");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 0);
}

exports['execute two pushes and lt given false when equal'] = function (test) {
	var status = simpleevm.execute("6002600210");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 0);
}



