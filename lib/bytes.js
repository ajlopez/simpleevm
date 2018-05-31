
function hexadecimalStringToBytes(text, length) {
	var l = text.length / 2;
	var bytes = [];
	var k = 0;
	
	for (var k = l; k > 0; k--) {
		var digits = text.substr((k - 1) * 2, 2);
		bytes.push(parseInt(digits, 16));
	}
	
	if (length != null)
		while (bytes.length < length)
			bytes.push(0);
	
	return bytes;
}

function toBytes(number, length) {
	if (Array.isArray(number))
		return number;
	
	if (typeof number === "string" && number.substring(0, 2) === "0x")
		return hexadecimalStringToBytes(number.substring(2), length);
	
	var bytes = [];
	var k = 0;
	
	while (number) {
		bytes[k++] = number & 0x00ff;
		number >>= 8;
	}
	
	if (length != null)
		while (bytes.length < length)
			bytes.push(0);
	
	return bytes;
}

function not(bytes) {
	var result = [];
	var l = bytes.length;
	
	for (var k = 0; k < l; k++)
		result[k] = (bytes[k] ^ 0xff) & 0xff;
	
	return result;
}

function noBits(bytes) {
	if (!bytes.length)
		return 0;
	
	var l = bytes.length - 1;
	
	while (l && !bytes[l])
		l--;
	
	return noBitsInByte(bytes[l]) + 8 * l;
}

function noBitsInByte(byte) {
	if (byte === 0)
		return 0;
	
	var mask = 0x80;
	var nbits = 8;
	
	while (!(byte & mask)) {
		mask >>= 1;
		nbits--;
	}
	
	return nbits;
	
}

module.exports = {
	toBytes: toBytes,
	noBits: noBits,
	not: not
}

