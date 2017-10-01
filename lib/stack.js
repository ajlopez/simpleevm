
function Stack() {
	var values = [];
	
	this.size = function () { return values.length; };
	this.get = function (index) { return values[index]; };
	this.push = function (value) { values.push(value); };
	this.pop = function () { return values.pop(); };
}

module.exports = function () {
	return new Stack();
};