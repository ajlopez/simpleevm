
var datawords = require('../lib/datawords');

exports['create dataword as object'] = function (test) {
    var dataword = datawords.dataword();
    
    test.ok(dataword);
    test.equal(typeof dataword, 'object');
};

