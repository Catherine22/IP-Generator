
const MAX_VALUE = 0b11111111;
const MIN_VALUE = 0b00000000;
const QUESTION_MARK = '??';
const PRIVATE_IP_ADDRESSES = {
	classA: {
		from: '10.0.0.0',
		to: '10.255.255.255'
	},
	classB: {
		from: '172.16.0.0',
		to: '172.31.255.255'
	},
	classC: {
		from: '192.168.0.0',
		to: '192.168.255.255'
	}
};
const OCTET = 8;

function random0To255() {
	return Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE;
}

function decimalArrToBinary(arr) {
	var binArr = new Array(arr.length);
	arr.forEach(function (value, index) {
		binArr[index] = (+value).toString(2);
	});

	const eightZeros = '00000000';
	binArr.forEach(function(value, index) {
		if (value.length < OCTET) {
			binArr[index] = eightZeros.substring(0, OCTET - value.length).concat(value);
		}
	});
	return parseInt(binArr.join(''), 2);
}

// E.g. 32767 -> 127.255
function decimalToAddrArr(dec) {
	var binStr = (+dec).toString(2);
	const eightZeros = '00000000';

	var overflow = binStr.length % OCTET;
	if (overflow !== 0) {
		binStr = eightZeros.substring(0, OCTET - overflow).concat(binStr);
	}

	var binArr = [];
	for (var i = 0; i < binStr.length / OCTET; i++) {
		binArr.push(parseInt(binStr.substring(i * OCTET, (i + 1) * OCTET), 2));
	}
	return binArr;
}

// E.g. 192.168.0 -> 192.168.0.0
function add0ToIpAddrIfNeeded(ipArr) {
	var newArr = ipArr.slice(0);
	while (newArr.length < 4) {
		newArr.push(0);
	}
	return newArr;
}

// Identify class type
export function identify(firstOctet) {
	if (firstOctet <= 1) return 'invalid';
	if (firstOctet < 127) return 'A';
	if (firstOctet == 127) return 'loopback';
	if (firstOctet < 192) return 'B';
	if (firstOctet < 224) return 'C';
	if (firstOctet < 240) return 'D';
	if (firstOctet <= 255) return 'E';
	return 'invalid';
}

export function generateIpv4() {
	var ipAddr = '';
	var octet1 = random0To255();
	var classType = identify(octet1);
	while (classType === 'lookback' || classType === 'invalid' || classType === 'D' || classType === 'E') {
		octet1 = random0To255();
		classType = identify(octet1);
	}
	ipAddr += octet1;

	ipAddr += '.';
	ipAddr += random0To255();

	ipAddr += '.';
	ipAddr += random0To255();

	ipAddr += '.';
	var octet4 = random0To255();
	while (octet4 == 0 || octet4 == 255) {
		octet4 = random0To255();
	}
	ipAddr += octet4;

	return {
		ipv4Addr: ipAddr,
		classType: classType
	};
}

export function getNetworkIp(ipv4) {
	const {
		ipv4Addr,
		classType
	} = ipv4;
	var arr = ipv4Addr.split('.');
	switch (classType) {
	case 'A':
		arr.splice(3, 1, MIN_VALUE).join('.');
		break;
	case 'B':
		arr.splice(2, 2, MIN_VALUE, MIN_VALUE).join('.');
		break;
	case 'C':
		arr.splice(1, 3, MIN_VALUE, MIN_VALUE, MIN_VALUE).join('.');
		break;
	default:
		return 'Not defined';
	}
	return arr.join('.');
}

export function getBroadcastId(ipv4) {
	const {
		ipv4Addr,
		classType
	} = ipv4;
	var arr = ipv4Addr.split('.');
	switch (classType) {
	case 'A':
		arr.splice(3, 1, MAX_VALUE);
		break;
	case 'B':
		arr.splice(2, 2, MAX_VALUE, MAX_VALUE);
		break;
	case 'C':
		arr.splice(1, 3, MAX_VALUE, MAX_VALUE, MAX_VALUE);
		break;
	default:
		return 'Not defined';
	}
	return arr.join('.');
}

export function getSubnetMask(classType) {
	switch (classType) {
	case 'A':
		return '255.0.0.0';
	case 'B':
		return '255.255.0.0';
	case 'C':
		return '255.255.255.0';
	default:
		return 'Not defined';
	}
}

export function getGateway(ipv4) {
	const {
		ipv4Addr,
		classType
	} = ipv4;
	var arr = ipv4Addr.split('.');
	switch (classType) {
	case 'A':
		arr.splice(3, 1, QUESTION_MARK);
		break;
	case 'B':
		arr.splice(2, 2, QUESTION_MARK, QUESTION_MARK);
		break;
	case 'C':
		arr.splice(1, 3, QUESTION_MARK, QUESTION_MARK, QUESTION_MARK);
		break;
	default:
		return 'Not defined';
	}
	return arr.join('.');
}

export function isIpv4Addr(ipAddr) {
	// 1-255.0-255.0-255.0-255
	const reg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/ig;
	return reg.test(ipAddr);
}

export function isPrivateIp(ipv4) {
	function isInOfTheRange(value, from, to) {
		return (value >= parseInt(from)) && (value <= parseInt(to));
	}
	const {
		ipv4Addr,
		classType
	} = ipv4;

	const arr = ipv4Addr.split('.');
	var from, to;

	switch (classType) {
	case 'A':
		from = PRIVATE_IP_ADDRESSES.classA.from.split('.');
		to = PRIVATE_IP_ADDRESSES.classA.to.split('.');
		break;
	case 'B':
		from = PRIVATE_IP_ADDRESSES.classB.from.split('.');
		to = PRIVATE_IP_ADDRESSES.classB.to.split('.');
		break;
	case 'C':
		from = PRIVATE_IP_ADDRESSES.classC.from.split('.');
		to = PRIVATE_IP_ADDRESSES.classC.to.split('.');
		break;
	default:
		return false;
	}
	var i = 0;
	while (arr[i]) {
		if (!isInOfTheRange(arr[i], from[i], to[i])) {
			return false;
		}
		i++;
	}

	return true;
}

export function calSubnet(ipv4) {
	const {
		ipv4Addr,
		classType,
		subnet
	} = ipv4;

	if(!isIpv4Addr(ipv4Addr)) {
		throw 'Illegal ip address';
	}

	if (!(subnet && subnet.length > 0)) {
		throw 'Subnet cannot be empty';
	}

	var minSubnet;
	var targetBits;
	var arr = ipv4Addr.split('.');
	var networkIdArr;
	var broadcastIdArr;
	switch (classType) {
	case 'A':
		minSubnet = OCTET * 1;
		targetBits =  decimalArrToBinary(arr.slice(1, 4));
		networkIdArr = arr.slice(0, 1);
		broadcastIdArr = arr.slice(0, 1);
		break;
	case 'B':
		minSubnet = OCTET * 2;
		targetBits = decimalArrToBinary(arr.slice(2, 4));
		networkIdArr = arr.slice(0, 2);
		broadcastIdArr = arr.slice(0, 2);
		break;
	case 'C':
		minSubnet = OCTET * 3;
		targetBits = decimalArrToBinary(arr.slice(3, 4));
		networkIdArr = arr.slice(0, 3);
		broadcastIdArr = arr.slice(0, 3);
		break;
	default:
		throw 'Must be class A, B or C';
	}

	if (subnet < minSubnet) {
		throw `The minimum subnet of Class ${classType} must be greater than ${minSubnet}`;
	}

	const availableBits = OCTET * 4 - subnet;
	const hosts = (Math.pow(2, availableBits) - 2); // available hosts (network ip and broadcast ip are not allowed)
	const subnets = Math.pow(2, subnet - minSubnet); // available amount of subnets
	const range = hosts + 2;
	const lastBroadcastId = Math.pow(2, OCTET * 4 - minSubnet) - 1;

	console.log('targetBits', targetBits);
	console.log('range', range);
	console.log('lastBroadcastId', lastBroadcastId);
	for (var i = 0; i < lastBroadcastId; i += range) {
		if (targetBits == i) {
			throw 'IP address cannot be a network ip';
		} else if (targetBits < i) {
			if (targetBits == i + availableBits - 1) {
				throw 'IP address cannot be a broadcast ip';
			} else {
				networkIdArr = networkIdArr.concat(decimalToAddrArr(i - range));
				broadcastIdArr = broadcastIdArr.concat(decimalToAddrArr(i - 1));
				return {
					hosts,
					subnets,
					networkIp: add0ToIpAddrIfNeeded(networkIdArr).join('.'),
					broadcastIp: add0ToIpAddrIfNeeded(broadcastIdArr).join('.')
				};
			}
		} else if (targetBits > i && targetBits < (i+range)) {
			networkIdArr = networkIdArr.concat(decimalToAddrArr(i));
			broadcastIdArr = broadcastIdArr.concat(decimalToAddrArr(i + range - 1));
			return {
				hosts,
				subnets,
				networkIp: add0ToIpAddrIfNeeded(networkIdArr).join('.'),
				broadcastIp: add0ToIpAddrIfNeeded(broadcastIdArr).join('.')
			};
		}
	}

	throw 'IP address cannot be a broadcast ip';
}

export function decimalToBinary(ipAddr) {
	const arr = ipAddr.split('.');
	var binArr = new Array(4);
	arr.forEach(function (value, index) {
		binArr[index] = (+value).toString(2);
	});

	const eightZeros = '00000000';
	binArr.forEach(function (value, index) {
		if (value.length < OCTET) {
			binArr[index] = eightZeros.substring(0, OCTET - value.length) + value;
		}
	});
	return binArr.join('.');
}
