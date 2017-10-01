
var simpleevm = require('..');

exports['execute push'] = function (test) {
	var status = simpleevm.execute("6001");
	
	test.ok(status);
	test.ok(status.stack);
	test.equal(status.stack.size(), 1);
	test.equal(status.stack.pop(), 1);
}

