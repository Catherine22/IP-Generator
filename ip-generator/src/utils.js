
const MAX_VALUE = 0b11111111;
const MIN_VALUE = 0b00000000;
const QUESTION_MARKS = '??';
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

// E.g. 192.168 -> 192.168.0.0
function add0ToIpAddrIfNeeded(ipArr) {
	var newArr = ipArr.slice(0);
	while (newArr.length < 4) {
		newArr.push(0);
	}
	return newArr;
}

// Identify class type
export function identify(ipAddrStr) {
	if (!isIpv4Addr(ipAddrStr)) return 'invalid';

	const o = parseInt(ipAddrStr.split('.')[0]);
	if (o < 1) return 'invalid';
	if (o < 127) return 'A';
	if (o === 127) return 'loopback';
	if (o < 192) return 'B';
	if (o < 224) return 'C';
	if (o < 240) return 'D';
	if (o <= 255) return 'E';
	return 'invalid';
}

export function generateIpv4() {
	function randomIp() {
		var ipAddrArr = [];
		for (var i = 0; i < 4; i++) {
			ipAddrArr.push(random0To255());
		}
		return ipAddrArr.join('.');
	}

	var ipv4Addr = randomIp();
	var classType = identify(ipv4Addr);
	while (!(classType === 'A' || classType === 'B' || classType === 'C')) {
		ipv4Addr = randomIp();
		classType = identify(ipv4Addr);
	}

	return {
		ipv4Addr,
		classType
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
		arr.splice(3, 1, QUESTION_MARKS);
		break;
	case 'B':
		arr.splice(2, 2, QUESTION_MARKS, QUESTION_MARKS);
		break;
	case 'C':
		arr.splice(1, 3, QUESTION_MARKS, QUESTION_MARKS, QUESTION_MARKS);
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
		throw new Error('Illegal ip address');
	}

	if (!(subnet && subnet.length > 0)) {
		throw new Error('Subnet cannot be empty');
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
		throw new Error('Must be class A, B or C');
	}

	if (subnet < minSubnet) {
		throw new Error(`The minimum subnets of Class ${classType} must be greater than ${minSubnet}`);
	}

	const availableBits = OCTET * 4 - subnet;
	const hosts = Math.pow(2, availableBits) - 2; // available hosts (network ip and broadcast ip are not allowed)
	const subnets = Math.pow(2, subnet - minSubnet); // amount of available subnets
	const range = hosts + 2;
	const lastBroadcastId = Math.pow(2, OCTET * 4 - minSubnet) - 1;

	for (var i = 0; i < lastBroadcastId; i += range) {
		if (targetBits === i) {
			throw new Error('IP address cannot be a network ip');
		} else if (targetBits < i) {
			if (targetBits === i + availableBits - 1) {
				throw new Error('IP address cannot be a broadcast ip');
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

	throw new Error('IP address cannot be a broadcast ip');
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
