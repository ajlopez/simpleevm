
function hexadecimalStringToBytes(text) {
	var l = text.length / 2;
	var bytes = [];
	var k = 0;
	
	for (var k = l; k > 0; k--) {
		var digits = text.substr((k - 1) * 2, 2);
		bytes.push(parseInt(digits, 16));
	}
	
	return bytes;
}

function toBytes(number) {
	if (typeof number === "string" && number.substring(0, 2) === "0x")
		return hexadecimalStringToBytes(number.substring(2));
	
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