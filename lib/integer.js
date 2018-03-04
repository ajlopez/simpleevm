
var MAX_VALUE = 0x1000000;

function Integer(value) {
	var values = [];
	var k = 0;
	
	while (value) {
		values[k++] = value % MAX_VALUE;
		value = Math.floor(value / MAX_VALUE);
	}
	
	this.isSafeInteger = function () {
		return values.length <= 2;
	}
	
	this.toInteger = function () {
		var factor = 1;
		var result = 0;
		
		for (var k = 0; k < values.length; k++) {
			result += values[k] * factor;
			factor *= MAX_VALUE;
		}
		
		return result;
	}
}

function createInteger(value) {
	return new Integer(value);
}

module.exports = createInteger;
