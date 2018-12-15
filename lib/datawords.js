
const BYTES = 32;

function DataWord() {
    var buffer = new ArrayBuffer(BYTES);
    var bytes = new Uint8Array(buffer);
    var uints = new Uint32Array(buffer);
    
    this.bytes = function () { return bytes; };
    
    this.toString = function () { 
        var result = '';
        
        for (var k = 0; k < uints.length; k++)
            result += ("00000000" + uints[k].toString(16)).slice(-8);
        
        return result;
    };
}

function createDataWord() {
    return new DataWord();
}

module.exports = {
    dataword: createDataWord,
    BYTES: BYTES
};

