
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

exports['to string'] = function (test) {
    var dataword = datawords.dataword();
    
    var result = dataword.toString();
    
    test.ok(result);
    test.equal(result, "0000000000000000000000000000000000000000000000000000000000000000");
};

