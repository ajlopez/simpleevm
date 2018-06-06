
var simpleevm = require('..');

exports['execute push one byte'] = function (test) {
	var state = simpleevm.execute("6001");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3);
}

exports['execute push two bytes'] = function (test) {
	var state = simpleevm.execute("610102");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 258);

	test.equal(state.gasused, 3);
}

exports['execute push three bytes'] = function (test) {
	var state = simpleevm.execute("62010000");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 256 * 256);

	test.equal(state.gasused, 3);
}

exports['execute two pushes and one add'] = function (test) {
	var state = simpleevm.execute("6001600201");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 3);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and one subtract'] = function (test) {
	var state = simpleevm.execute("6001600203");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and one multiply'] = function (test) {
	var state = simpleevm.execute("6002600302");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 6);

	test.equal(state.gasused, 3 + 3 + 5);
}

exports['execute two pushes and divide'] = function (test) {
	var state = simpleevm.execute("6002600604");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 3);

	test.equal(state.gasused, 3 + 3 + 5);
}

exports['execute div with zero divisor'] = function (test) {
	var state = simpleevm.execute("6000600604");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 5);
}

exports['execute two pushes and mod'] = function (test) {
	var state = simpleevm.execute("6003600506");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 2);

	test.equal(state.gasused, 3 + 3 + 5);
}

exports['execute mod with zero divisor'] = function (test) {
	var state = simpleevm.execute("6000600606");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 5);
}

exports['execute addmod'] = function (test) {
	var state = simpleevm.execute("60036001600408");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 2);

	test.equal(state.gasused, 3 + 3 + 3 + 8);
}

exports['execute addmod with zero divisor'] = function (test) {
	var state = simpleevm.execute("60006001600408");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3 + 8);
}

exports['execute mulmod'] = function (test) {
	var state = simpleevm.execute("60036002600409");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 2);

	test.equal(state.gasused, 3 + 3 + 3 + 8);
}

exports['execute mulmod with zero divisor'] = function (test) {
	var state = simpleevm.execute("60006002600409");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3 + 8);
}

exports['execute two pushes and exp'] = function (test) {
	var state = simpleevm.execute("600360020a");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 8);

	test.equal(state.gasused, 3 + 3 + 10 + 10 * 2);
}

exports['execute two pushes and exp to zero'] = function (test) {
	var state = simpleevm.execute("600060020a");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3 + 3 + 10);
}

exports['execute push and dup'] = function (test) {
	var state = simpleevm.execute("600180");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 2);
	test.equal(state.stack.pop(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3 + 3);
}

exports['execute two pushes and swap1'] = function (test) {
	var state = simpleevm.execute("6001600290");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 2);
	test.equal(state.stack.pop(), 1);
	test.equal(state.stack.pop(), 2);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute three pushes and swap2'] = function (test) {
	var state = simpleevm.execute("60016002600391");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 3);
	test.equal(state.stack.pop(), 1);
	test.equal(state.stack.pop(), 2);
	test.equal(state.stack.pop(), 3);

	test.equal(state.gasused, 3 + 3 + 3 + 3);
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

		var state = simpleevm.execute(code);
	
		test.ok(state);
		test.ok(state.stack);
		test.equal(state.stack.size(), k + 2);
		test.equal(state.stack.peek(0), 0);
		test.equal(state.stack.peek(k + 1), k + 1);

		test.equal(state.gasused, 3 * (k + 2) + 3);
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

		var state = simpleevm.execute(code);
	
		test.ok(state);
		test.ok(state.stack);
		test.equal(state.stack.size(), k + 2);
		test.equal(state.stack.peek(0), 0);
		test.equal(state.stack.peek(1), k);

		test.equal(state.gasused, 3 * (k + 1) + 3);
	}
}

exports['execute two pushes and lt given true'] = function (test) {
	var state = simpleevm.execute("6002600110");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and lt given false'] = function (test) {
	var state = simpleevm.execute("6002600310");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and lt given false when equal'] = function (test) {
	var state = simpleevm.execute("6002600210");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and gt given true'] = function (test) {
	var state = simpleevm.execute("6002600311");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and gt given false'] = function (test) {
	var state = simpleevm.execute("6002600111");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and gt given false when equal'] = function (test) {
	var state = simpleevm.execute("6002600211");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and eq'] = function (test) {
	var state = simpleevm.execute("6002600214");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute two pushes and eq given false'] = function (test) {
	var state = simpleevm.execute("6002600314");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute push and iszero'] = function (test) {
	var state = simpleevm.execute("600015");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 1);

	test.equal(state.gasused, 3 + 3);
}

exports['execute push and iszero given false'] = function (test) {
	var state = simpleevm.execute("600115");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3);
}

exports['execute and'] = function (test) {
	var state = simpleevm.execute("610fff61010116");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 257);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute or'] = function (test) {
	var state = simpleevm.execute("610fff61010117");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0x0fff);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute xor'] = function (test) {
	var state = simpleevm.execute("610fff61010118");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0x0efe);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute not'] = function (test) {
	var state = simpleevm.execute("610fff19");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	
	var result = state.stack.pop();
	
	test.ok(result);
	test.equal(result.length, 32);

	test.equal(state.gasused, 3 + 3);
}

exports['execute byte'] = function (test) {
	var state = simpleevm.execute("610fff601e1a");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0x0f);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute byte with offset out of range'] = function (test) {
	var state = simpleevm.execute("610fff6101001a");
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0);

	test.equal(state.gasused, 3 + 3 + 3);
}

exports['execute number using state'] = function (test) {
	var state = simpleevm.execute("43", { number: 0x01020304 });
	
	test.ok(state);
	test.ok(state.stack);
	test.equal(state.stack.size(), 1);
	test.equal(state.stack.pop(), 0x01020304);
	test.equal(state.number, 0x01020304);

	test.equal(state.gasused, 2);
}
