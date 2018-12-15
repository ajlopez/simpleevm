
const BYTES = 32;

function DataWord(value) {
    var buffer = new ArrayBuffer(BYTES);
    var bytes = new Uint8Array(buffer);
    var view = new DataView(buffer);
    
    if (typeof value === 'number') {
        view.setUint32(BYTES - 4, value % 0x0100000000, false);
        view.setUint32(BYTES - 8, Math.floor(value / 0x0100000000), false);
    }
    
    this.bytes = function () { return bytes; };
    
    this.toString = function () { 
        var result = '';
        
        for (var k = 0; k < bytes.length; k += 4)
            result += ("00000000" + view.getUint32(k, false).toString(16)).slice(-8);
        
        return result;
    };
}

function createDataWord(value) {
    return new DataWord(value);
}

module.exports = {
    dataword: createDataWord,
    BYTES: BYTES
};

