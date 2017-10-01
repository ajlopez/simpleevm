
var stack = require('../lib/stack');

exports['create empty stack'] = function (test) {
	var st = stack();
	
	test.ok(st);
	test.equal(st.size(), 0);
};

exports['push value'] = function (test) {
	var st = stack();
	
	st.push(42);
	test.equal(st.size(), 1);
	test.equal(st.get(0), 42);
};

exports['push and pop value'] = function (test) {
	var st = stack();
	
	st.push(42);
	
	var result = st.pop();
	
	test.equal(st.size(), 0);
	test.equal(result, 42);
}

