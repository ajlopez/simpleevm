
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
	if (Array.isArray(number) || number instanceof Buffer)
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

function isZero(bytes) {
	for (var k = 0; k < bytes.length; k++)
		if (bytes[k])
			return false;
		
	return true;
}

function equal(bytes1, bytes2) {
	var l1 = bytes1.length;
	var l2 = bytes2.length;
	
	for (var k = 0; k < l1 && k < l2; k++)
		if (bytes1[k] !== bytes2[k])
			return false;
		
	for (var j = k; j < l1; j++)
		if (bytes1[j] !== 0)
			return false;
		
	for (var j = k; j < l2; j++)
		if (bytes2[j] !== 0)
			return false;
		
	return true;
}

function and(bytes1, bytes2) {
	var l1 = bytes1.length;
	var l2 = bytes2.length;
	var result = [];
	
	for (var k = 0; k < l1 && k < l2; k++)
		result[k] = bytes1[k] & bytes2[k];
		
	return result;
}

function or(bytes1, bytes2) {
	var l1 = bytes1.length;
	var l2 = bytes2.length;
	var result = [];
	
	for (var k = 0; k < l1 || k < l2; k++)
		result[k] = bytes1[k] | bytes2[k];
		
	return result;
}

function xor(bytes1, bytes2) {
	var l1 = bytes1.length;
	var l2 = bytes2.length;
	var result = [];
	
	for (var k = 0; k < l1 || k < l2; k++)
		result[k] = bytes1[k] ^ bytes2[k];
		
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
	not: not,
	equal: equal,
	isZero: isZero,
	and: and,
	or: or,
	xor: xor
}

