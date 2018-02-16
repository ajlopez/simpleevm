
function toBytes(number) {
	var bytes = [];
	var k = 0;
	
	while (number) {
		bytes[k++] = number & 0x00ff;
		number >>= 8;
	}
	
	return bytes;
}

module.exports = {
	toBytes: toBytes
}