
const BYTES = 32;

function DataWord() {
    var bytes = new ArrayBuffer(BYTES);
    this.bytes = function () { return new Uint8Array(bytes); }
}

function createDataWord() {
    return new DataWord();
}

module.exports = {
    dataword: createDataWord,
    BYTES: BYTES
};

