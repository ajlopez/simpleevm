
var datawords = require('../lib/datawords');

exports['create dataword as object'] = function (test) {
    var dataword = datawords.dataword();
    
    test.ok(dataword);
    test.equal(typeof dataword, 'object');
};

exports['get bytes'] = function (test) {
    var dataword = datawords.dataword();
    
    var result = dataword.bytes();
    
    test.ok(result);
    test.equal(result.length, datawords.BYTES);
    
    for (var k = 0; k < datawords.BYTES; k++)
        test.equal(result[k], 0);
};

exports['from byte value'] = function (test) {
    var dataword = datawords.dataword(1);
    
    var result = dataword.bytes();
    
    test.ok(result);
    test.equal(result.length, datawords.BYTES);
    
    for (var k = 0; k < datawords.BYTES - 1; k++)
        test.equal(result[k], 0);
    
    test.equal(result[datawords.BYTES - 1], 1);
};

exports['from short value'] = function (test) {
    var dataword = datawords.dataword(256);
    
    var result = dataword.bytes();
    
    test.ok(result);
    test.equal(result.length, datawords.BYTES);
    
    for (var k = 0; k < datawords.BYTES - 2; k++)
        test.equal(result[k], 0);
    
    test.equal(result[datawords.BYTES - 2], 1);
    test.equal(result[datawords.BYTES - 1], 0);
};

exports['from uint32 value'] = function (test) {
    var dataword = datawords.dataword(0xffffffff);
    
    var result = dataword.bytes();
    
    test.ok(result);
    test.equal(result.length, datawords.BYTES);
    
    for (var k = 0; k < datawords.BYTES - 4; k++)
        test.equal(result[k], 0);
    
    test.equal(result[datawords.BYTES - 4], 0xff);
    test.equal(result[datawords.BYTES - 3], 0xff);
    test.equal(result[datawords.BYTES - 2], 0xff);
    test.equal(result[datawords.BYTES - 1], 0xff);
};

exports['from int value'] = function (test) {
    var dataword = datawords.dataword(0x100000000);
    
    var result = dataword.bytes();
    
    test.ok(result);
    test.equal(result.length, datawords.BYTES);
    
    for (var k = 0; k < datawords.BYTES - 5; k++)
        test.equal(result[k], 0);
    
    test.equal(result[datawords.BYTES - 5], 1);
    test.equal(result[datawords.BYTES - 4], 0);
    test.equal(result[datawords.BYTES - 3], 0);
    test.equal(result[datawords.BYTES - 2], 0);
    test.equal(result[datawords.BYTES - 1], 0);
};

exports['to string'] = function (test) {
    var dataword = datawords.dataword();
    
    var result = dataword.toString();
    
    test.ok(result);
    test.equal(result, "0000000000000000000000000000000000000000000000000000000000000000");
};

exports['to normalized string'] = function (test) {
    var dataword = datawords.dataword();
    
    test.equal(datawords.dataword(0).toNormalizedString(), "00");
    test.equal(datawords.dataword(1).toNormalizedString(), "01");
    test.equal(datawords.dataword(256).toNormalizedString(), "0100");
    test.equal(datawords.dataword("0102030405060708090a0b0c0d0e0f").toNormalizedString(), "0102030405060708090a0b0c0d0e0f");
};

exports['from hexadecimal string'] = function (test) {
    var dataword = datawords.dataword("0102030405060708090a0b0c0d0e0f");
    
    var result = dataword.toString();
    
    test.ok(result);
    test.equal(result, "00000000000000000000000000000000000102030405060708090a0b0c0d0e0f");
};

exports['equals'] = function (test) {
    var dataword1 = datawords.dataword("01");
    var dataword2 = datawords.dataword("01");
    var dataword3 = datawords.dataword("02");
    var dataword4 = datawords.dataword("0102030405060708090a0b0c0d0e0f");
    var dataword5 = datawords.dataword("0102030405060708090a0b0c0d0e0f");
    
    test.ok(dataword1.equals(dataword1));
    test.ok(dataword1.equals(dataword2));
    test.ok(dataword2.equals(dataword1));
    test.ok(dataword3.equals(dataword3));
    test.ok(dataword4.equals(dataword4));
    test.ok(dataword4.equals(dataword5));
    test.ok(dataword5.equals(dataword4));
    
    test.ok(!dataword1.equals(dataword3));
    test.ok(!dataword3.equals(dataword1));
    test.ok(!dataword1.equals(dataword4));
    test.ok(!dataword4.equals(dataword1));
    
    test.ok(!dataword1.equals(null));
    test.ok(!dataword1.equals(42));
    test.ok(!dataword1.equals("foo"));
};

