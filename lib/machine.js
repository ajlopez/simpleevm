
const stack = require('./stack');
const bytes = require('./bytes');

const fees = [ 0, 2, 3, 5, 8, 20, 10, 10 ];

const FeeGroups = { Zero: 0, Base: 1, VeryLow : 2, Low: 3, Mid: 4, Ext: 5, Exp: 6, ExpByte: 7 };

const costs = [];

costs[0x01] = FeeGroups.VeryLow;
costs[0x02] = FeeGroups.Low;
costs[0x03] = FeeGroups.VeryLow;
costs[0x04] = FeeGroups.Low;
costs[0x06] = FeeGroups.Low;
costs[0x08] = FeeGroups.Mid;
costs[0x09] = FeeGroups.Mid;

costs[0x10] = FeeGroups.VeryLow;
costs[0x11] = FeeGroups.VeryLow;
costs[0x14] = FeeGroups.VeryLow;
costs[0x15] = FeeGroups.VeryLow;
costs[0x16] = FeeGroups.VeryLow;
costs[0x17] = FeeGroups.VeryLow;
costs[0x18] = FeeGroups.VeryLow;
costs[0x19] = FeeGroups.VeryLow;
costs[0x1a] = FeeGroups.VeryLow;

costs[0x30] = FeeGroups.Base;
costs[0x31] = FeeGroups.Ext;
costs[0x32] = FeeGroups.Base;
costs[0x33] = FeeGroups.Base;
costs[0x34] = FeeGroups.Base;
costs[0x35] = FeeGroups.VeryLow;
costs[0x36] = FeeGroups.Base;
costs[0x3a] = FeeGroups.Base;

costs[0x41] = FeeGroups.Base;
costs[0x42] = FeeGroups.Base;
costs[0x43] = FeeGroups.Base;
costs[0x44] = FeeGroups.Base;
costs[0x45] = FeeGroups.Base;

costs[0x50] = FeeGroups.Base;

for (var k = 0; k < 32; k++)
	costs[0x60 + k] = FeeGroups.VeryLow;

for (var k = 0; k < 16; k++)
	costs[0x80 + k] = FeeGroups.VeryLow;

for (var k = 0; k < 16; k++)
	costs[0x90 + k] = FeeGroups.VeryLow;

const fns = [];

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

fns[0x35] = callDataLoadOp;
fns[0x36] = callDataSizeOp;

fns[0x3a] = makeStateOp('gasprice');

fns[0x41] = makeStateOp('coinbase');
fns[0x42] = makeStateOp('timestamp');
fns[0x43] = makeStateOp('number');
fns[0x44] = makeStateOp('difficulty');
fns[0x45] = makeStateOp('gaslimit');

fns[0x50] = popOp;

for (var k = 0; k < 32; k++)
	fns[0x60 + k] = pushOp;

for (var k = 0; k < 16; k++)
	fns[0x80 + k] = dupOp;

for (var k = 0; k < 16; k++)
	fns[0x90 + k] = swapOp;

function addOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	state.stack.push(value1 + value2);
}

function mulOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	state.stack.push(value1 * value2);
}

function subOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	state.stack.push(value1 - value2);
}

function divOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (value2 === 0)
		state.stack.push(0);
	else
		state.stack.push(Math.floor(value1 / value2));
}

function modOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (value2 === 0)
		state.stack.push(0);
	else
		state.stack.push(value1 % value2);
}

function addModOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	const value3 = state.stack.pop();
	
	if (value3 === 0)
		state.stack.push(0);
	else
		state.stack.push((value1 + value2) % value3);
}

function mulModOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	const value3 = state.stack.pop();
	
	if (value3 === 0)
		state.stack.push(0);
	else
		state.stack.push((value1 * value2) % value3);
}

function expOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	state.stack.push(Math.pow(value1, value2));
	
	const nbits = bytes.noBits(bytes.toBytes(value2));
	
	state.gasused += fees[FeeGroups.Exp] + nbits * fees[FeeGroups.ExpByte];
}

function ltOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (typeof value1 === 'number' && typeof value2 === 'number')
		if (value1 < value2)
			state.stack.push(1);
		else
			state.stack.push(0);
	else {
		const result = bytes.compare(bytes.toBytes(value1), bytes.toBytes(value2));
		
		if (result < 0)
			state.stack.push(1);
		else
			state.stack.push(0);
	}
}

function gtOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (typeof value1 === 'number' && typeof value2 === 'number')
		if (value1 > value2)
			state.stack.push(1);
		else
			state.stack.push(0);
	else {
		const result = bytes.compare(bytes.toBytes(value1), bytes.toBytes(value2));
		
		if (result > 0)
			state.stack.push(1);
		else
			state.stack.push(0);
	}
}

function eqOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (value1 === value2)
		state.stack.push(1);
	else {
		const val1 = bytes.toBytes(value1);
		const val2 = bytes.toBytes(value2);

		if (bytes.equal(val1, val2))
			state.stack.push(1);
		else
			state.stack.push(0);
	}
}

function isZeroOp(state, opcodes, pc) {
	const value = state.stack.pop();
	
	if (value === 0 || bytes.isZero(bytes.toBytes(value)))
		state.stack.push(1);
	else
		state.stack.push(0);
}

function andOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (typeof value1 === 'number' && typeof value2 === 'number')
		state.stack.push(value1 & value2);
	else
		state.stack.push(bytes.and(bytes.toBytes(value1), bytes.toBytes(value2)));
}

function orOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (typeof value1 === 'number' && typeof value2 === 'number')
		state.stack.push(value1 | value2);
	else
		state.stack.push(bytes.or(bytes.toBytes(value1), bytes.toBytes(value2)));
}

function xorOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();
	
	if (typeof value1 === 'number' && typeof value2 === 'number')
		state.stack.push(value1 ^ value2);
	else
		state.stack.push(bytes.xor(bytes.toBytes(value1), bytes.toBytes(value2)));
}

function notOp(state, opcodes, pc) {
	const value = state.stack.pop();
	const result = bytes.not(bytes.toBytes(value, 32));
	
	state.stack.push(result);
}

function byteOp(state, opcodes, pc) {
	const value1 = state.stack.pop();
	const value2 = state.stack.pop();

	if (value1 < 32) {
		const bts = bytes.toBytes(value2);
		
		const value = bts[31 - value1] || 0;
		
		state.stack.push(value);
	}
	else
		state.stack.push(0);
}

function popOp(state, opcodes, pc) {
	state.stack.pop();
}

function pushOp(state, opcodes, pc) {
	const nbytes = opcodes[pc] - 0x60 + 1;

	if (nbytes <= 4)
		state.stack.push(bytesToValue(opcodes, pc + 1, nbytes));
	else
		state.stack.push(opcodes.slice(pc + 1, pc + 1 + nbytes).reverse());

	return nbytes;
}

function dupOp(state, opcodes, pc) {
	const source = opcodes[pc] - 0x80;
	state.stack.push(state.stack.peek(source));
}

function swapOp(state, opcodes, pc) {
	const target = opcodes[pc] - 0x90 + 1;
	const top = state.stack.size() - 1;
	const value1 = state.stack.peek(0);
	const value2 = state.stack.peek(target);
	state.stack.put(top - target, value1);
	state.stack.put(top, value2);				
}

function callDataLoadOp(state, opcodes, pc) {
	const offset = state.stack.pop();
	const data = state.calldata;
	
    const l = data ? data.length : 0;
	
	const result = [];
	
	for (var k = 0; k < 32; k++)
		if (k + offset >= l)
			result.push(0);
		else
			result.push(data[k + offset]);
	
	state.stack.push(result);
}

function callDataSizeOp(state, opcodes, pc) {
	state.stack.push(state.calldata ? state.calldata.length : 0);
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

function State(init) {
	init = init || {};

	this.gasused = 0;
	this.stack = stack();
	
	for (var n in init)
		this[n] = init[n];
}

function Machine(init) {
	const state = new State(init);
	
	this.state = function () { return state; };
	
	this.execute = function (opcodes) {
		var pc = 0;
		const l = opcodes.length;
		
		while (pc < l) {
			if (fns[opcodes[pc]]) {
				const feeindex = costs[opcodes[pc]];
				
				if (feeindex != null)
					state.gasused += fees[costs[opcodes[pc]]];
				
				const dpc = fns[opcodes[pc]](state, opcodes, pc);
				
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

