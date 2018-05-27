
var bytes = require('../lib/bytes');

exports['convert simple integer to bytes'] = function (test) {
	var result = bytes.toBytes(258);
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(2, result.length);
	test.equal(2, result[0]);
	test.equal(1, result[1]);
};

exports['no convertion if array'] = function (test) {
	var result = bytes.toBytes([2, 1]);
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(2, result.length);
	test.equal(2, result[0]);
	test.equal(1, result[1]);
};

exports['convert simple integer to bytes with expected length'] = function (test) {
	var result = bytes.toBytes(258, 32);
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(32, result.length);
	test.equal(2, result[0]);
	test.equal(1, result[1]);
	
	for (var k = 2; k < 32; k++)
		test.equal(0, result[k]);
};

exports['convert hexa string to bytes'] = function (test) {
	var result = bytes.toBytes("0x01ff");
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(2, result.length);
	test.equal(255, result[0]);
	test.equal(1, result[1]);
};

exports['convert hexa string to bytes with expected length'] = function (test) {
	var result = bytes.toBytes("0x01ff", 32);
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(32, result.length);
	test.equal(255, result[0]);
	test.equal(1, result[1]);
	
	for (var k = 2; k < 32; k++)
		test.equal(result[k], 0);
};
