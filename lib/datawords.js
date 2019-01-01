
const BYTES = 32;
const UINT32_MODULUS = 0x0100000000;

function DataWord(value) {
    var buffer = new ArrayBuffer(BYTES);
    var bytes = new Uint8Array(buffer);
    var view = new DataView(buffer);
    
    if (typeof value === 'number') {
        view.setUint32(BYTES - 4, value % UINT32_MODULUS, false);
        view.setUint32(BYTES - 8, Math.floor(value / UINT32_MODULUS), false);
    }
    else if (typeof value === 'string') {
        if (value.length % 2)
            value = '0' + value;
        
        var nbytes = value.length / 2;
        
        for (var k = 0; k < value.length; k += 2)
            bytes[BYTES - nbytes + k / 2] = parseInt(value.substring(k, k + 2), 16);
    }
    
    this.bytes = function () { return bytes; };
    
    this.toString = function () { 
        var result = '';
        
        for (var k = 0; k < bytes.length; k += 4)
            result += ("00000000" + view.getUint32(k, false).toString(16)).slice(-8);
        
        return result;
    };
    
    this.toNormalizedString = function () { 
        var result = '';
        
        for (var k = 0; k < bytes.length; k += 4) {
            var value = view.getUint32(k, false);
            
            if (value === 0 && result.length === 0)
                continue;
            
            if (result.length)
                result += ("00000000" + value.toString(16)).slice(-8);
            else
                result = value.toString(16);
        }
        
        if (result.length % 2)
            result = '0' + result;
        
        if (!result.length)
            result = '00';
        
        return result;
    };
    
    this.equals = function (value) {
        if (!(value instanceof DataWord))
            return false;
        
        var vbytes = value.bytes();
        
        if (!vbytes || vbytes.length !== bytes.length)
            return false;
        
        for (var k = 0; k < bytes.length; k++)
            if (bytes[k] !== vbytes[k])
                return false;
            
        return true;
    };
}

function createDataWord(value) {
    return new DataWord(value);
}

module.exports = {
    dataword: createDataWord,
    BYTES: BYTES
};

