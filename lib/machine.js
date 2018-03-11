
var stack = require('./stack');
var bytes = require('./bytes');

var fns = [];

fns[0x01] = addOp;
fns[0x02] = mulOp;
fns[0x03] = subOp;
fns[0x04] = divOp;
fns[0x06] = modOp;
fns[0x08] = addModOp;
fns[0x09] = mulModOp;
fns[0x0a] = expOp;

fns[0x10] = ltOp;
fns[0x11] = gtOp;
fns[0x14] = eqOp;
fns[0x15] = isZeroOp;
fns[0x16] = andOp;
fns[0x17] = orOp;
fns[0x18] = xorOp;
fns[0x19] = notOp;
fns[0x1a] = byteOp;

fns[0x30] = makeStateOp('address');
fns[0x31] = makeStateOp('balance');
fns[0x32] = makeStateOp('origin');
fns[0x33] = makeStateOp('caller');
fns[0x34] = makeStateOp('callvalue');
fns[0x36] = callDataSizeOp;

fns[0x41] = makeStateOp('coinbase');
fns[0x42] = makeStateOp('timestamp');
fns[0x43] = makeStateOp('number');
fns[0x44] = makeStateOp('difficulty');
fns[0x45] = makeStateOp('gaslimit');

for (var k = 0; k < 32; k++)
	fns[0x60 + k] = pushOp;

for (var k = 0; k < 16; k++)
	fns[0x80 + k] = dupOp;

for (var k = 0; k < 16; k++)
	fns[0x90 + k] = swapOp;

function addOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 + value2);
}

function mulOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 * value2);
}

function subOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 - value2);
}

function divOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	if (value2 === 0)
		state.stack.push(0);
	else
		state.stack.push(Math.floor(value1 / value2));
}

function modOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	if (value2 === 0)
		state.stack.push(0);
	else
		state.stack.push(value1 % value2);
}

function addModOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	var value3 = state.stack.pop();
	
	if (value3 === 0)
		state.stack.push(0);
	else
		state.stack.push((value1 + value2) % value3);
}

function mulModOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	var value3 = state.stack.pop();
	
	if (value3 === 0)
		state.stack.push(0);
	else
		state.stack.push((value1 * value2) % value3);
}

function expOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(Math.pow(value1, value2));
}

function ltOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	if (value1 < value2)
		state.stack.push(1);
	else
		state.stack.push(0);
}

function gtOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	if (value1 > value2)
		state.stack.push(1);
	else
		state.stack.push(0);
}

function eqOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	if (value1 === value2)
		state.stack.push(1);
	else
		state.stack.push(0);
}

function isZeroOp(state, opcodes, pc) {
	var value = state.stack.pop();
	if (value === 0)
		state.stack.push(1);
	else
		state.stack.push(0);
}

function andOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 & value2);
}

function orOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 | value2);
}

function xorOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();
	
	state.stack.push(value1 ^ value2);
}

function notOp(state, opcodes, pc) {
	var value = state.stack.pop();
	var result = bytes.not(bytes.toBytes(value, 32));
	
	state.stack.push(result);
}

function byteOp(state, opcodes, pc) {
	var value1 = state.stack.pop();
	var value2 = state.stack.pop();

	if (value1 < 32) {
		var bts = bytes.toBytes(value2);
		
		var value = bts[31 - value1] || 0;
		
		state.stack.push(value);
	}
	else
		state.stack.push(0);
}

function pushOp(state, opcodes, pc) {
	var nbytes = opcodes[pc] - 0x60 + 1;

	state.stack.push(bytesToValue(opcodes, pc + 1, nbytes));

	return nbytes;
}

function dupOp(state, opcodes, pc) {
	var source = opcodes[pc] - 0x80;
	state.stack.push(state.stack.peek(source));
}

function swapOp(state, opcodes, pc) {
	var target = opcodes[pc] - 0x90 + 1;
	var top = state.stack.size() - 1;
	var value1 = state.stack.peek(0);
	var value2 = state.stack.peek(target);
	state.stack.put(top - target, value1);
	state.stack.put(top, value2);				
}

function callDataSizeOp(state, opcodes, pc) {
	state.stack.push(state.calldata.length);
}

function makeStateOp(name) {
	return function (state, opcodes, pc) {
		state.stack.push(state[name]);
	}
}

function bytesToValue(bytes, offset, length) {
	var value = 0;
	
	for (var k = 0; k < length; k++) {
		value <<= 8;
		value += bytes[offset + k]
	}
	
	return value;
}

function Machine(init) {
	var state = {};
	init = init || {};
	
	for (var n in init)
		state[n] = init[n];
	
	state.stack = stack();
	
	this.state = function () { return state; };
	
	this.execute = function (opcodes) {
		var pc = 0;
		var l = opcodes.length;
		
		while (pc < l) {
			if (fns[opcodes[pc]]) {
				var dpc = fns[opcodes[pc]](state, opcodes, pc);
				
				if (dpc)
					pc += dpc;
			}
			
			pc++;
		}
	}	
}

module.exports = function (init) {
	return new Machine(init);
};

