
var bytes = require('../lib/bytes');

exports['convert simple integer to bytes'] = function (test) {
	var result = bytes.toBytes(258);
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(2, result.length);
	test.equal(2, result[0]);
	test.equal(1, result[1]);
};

