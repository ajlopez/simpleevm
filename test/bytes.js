
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

exports['no convertion if buffer'] = function (test) {
	var result = bytes.toBytes(Buffer.from('0201', 'hex'));
	
	test.ok(result);
	test.ok(result instanceof Buffer);
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

exports['no bits for empty array'] = function (test) {
	var result = bytes.noBits([]);
	
	test.equal(0, result);
};

exports['no bits for zero byte in array'] = function (test) {
	var result = bytes.noBits([ 0 ]);
	
	test.equal(0, result);
};

exports['bits in one byte'] = function (test) {
	for (var k = 0; k < 8; k++) {
		var result = bytes.noBits([1 << k]);
		
		test.equal(k + 1, result);
	}
};

exports['bits in two bytes'] = function (test) {
	for (var k = 0; k < 8; k++) {
		var result = bytes.noBits([0, 1 << k]);
		
		test.equal(k + 9, result);
	}
};

exports['bits in two bytes, last one is zero'] = function (test) {
	for (var k = 0; k < 8; k++) {
		var result = bytes.noBits([1 << k, 0]);
		
		test.equal(k + 1, result);
	}
};

exports['two equal bytes values'] = function (test) {
	test.ok(bytes.equal([ 1, 2, 3 ], [ 1, 2, 3 ]));
};

exports['two equal bytes values with different lengths'] = function (test) {
	test.ok(bytes.equal([ 1, 2, 3, 0 ], [ 1, 2, 3 ]));
	test.ok(bytes.equal([ 1, 2, 3 ], [ 1, 2, 3, 0, 0 ]));
};

exports['two not equal bytes values'] = function (test) {
	test.ok(!bytes.equal([ 1, 2, 3 ], [ 3, 2, 3 ]));
	test.ok(!bytes.equal([ 1, 3, 3 ], [ 1, 2, 3 ]));
	test.ok(!bytes.equal([ 1, 2, 3 ], [ 1, 2, 4 ]));
};

exports['two not equal bytes values with different lengths'] = function (test) {
	test.ok(!bytes.equal([ 1, 2, 3 ], [ 3, 2, 3, 0 ]));
	test.ok(!bytes.equal([ 1, 3, 3, 0, 0 ], [ 1, 2, 3 ]));
	test.ok(!bytes.equal([ 1, 2, 3 ], [ 1, 2, 4, 0, 0, 0 ]));
};

