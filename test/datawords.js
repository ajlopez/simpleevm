
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

