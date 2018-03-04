
var integer = require('../lib/integer');

exports['create from safe integer'] = function (test) {
	var value = integer(42);
	
	test.ok(value);
	test.equal(typeof value, 'object');
	test.ok(value.isSafeInteger());
	test.equal(value.toInteger(), 42);
}


