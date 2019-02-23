
function Stack() {
	const values = [];
	
	this.size = function () { return values.length; };
	this.get = function (index) { return values[index]; };
	this.put = function (index, value) { values[index] = value; };
	this.push = function (value) { values.push(value); };
	this.pop = function () { return values.pop(); };
	this.peek = function (offset) { return values[values.length - 1 - offset]; };
}

module.exports = function () {
	return new Stack();
};

