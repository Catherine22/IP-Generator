import React from 'react';
import {
	isIpv4Addr,
	identify,
	generateIpv4
} from '../utils';
import {
	IPv4View
} from '../components';
import renderer from 'react-test-renderer';

const SAMPLE_COUNT = 100;
const INVALID_IP_ADDRS = [
	'0.0.0.0',
	'2.01.1.1',
	'0.32.4.1',
	'-1.3.54.2',
	'144.32.23.256',
	'A.23.4.12',
	'23.024.12.1'
];

// test(name, fn, timeout) is equivalent to it(name, fn, timeout)
it('verify ip addresses', () => {
	// [1-255].[0-255].[0-255].[0-255]
	var validIpArr = [];
	for (var j=0; j<SAMPLE_COUNT;j++) {
		validIpArr.push(Math.floor(Math.random() * 255) + 1);
		for (var i = 1; i < 4; i++) {
			validIpArr.push(Math.floor(Math.random() * 256));
		}
		expect(isIpv4Addr(validIpArr.join('.'))).toBe(true);
		validIpArr = [];
	}
    
	INVALID_IP_ADDRS.forEach(function (ipAddr) {
		expect(isIpv4Addr(ipAddr)).toBe(false);
	});
});

it('Generate random ip addresses correctly', () => {
	for (var i = 0; i < SAMPLE_COUNT; i++) {
		const {
			ipv4Addr,
			classType
		} = generateIpv4();
		const view = renderer.create(<IPv4View ipv4Addr={ipv4Addr} classType={classType} verify />);
		const instance = view.root;
		const ipAddrView = instance.findByType('h3');
		expect(ipAddrView.props.children).toContain(ipv4Addr);
		expect(ipAddrView.props.style.color).toBe('green');
	}
});

describe('Classify ip addresses correctly', () => {
	const classArr = ['A', 'B', 'C'];

	it('Check private ip addresses', () => {
		const {
			classA,
			classB,
			classC
		} = generatePrivateIpAddrs(SAMPLE_COUNT);
		const privateIpAddrs = classA.concat(classB).concat(classC);
		var header = -1;
		for (var i = 0; i < privateIpAddrs.length; i++) {
			if (i % SAMPLE_COUNT === 0) {
				header++;
			}
			const view = renderer.create(<IPv4View ipv4Addr={privateIpAddrs[i]} classType={classArr[header]} verify />);
			const instance = view.root;
			const ipAddrView = instance.findByType('h3');
			expect(ipAddrView.props.children).toContain('Private');
			expect(ipAddrView.props.style.color).toBe('green');
		}
	});

	it('Check public ip addresses', () => {
		const {
			classA,
			classB,
			classC
		} = generatePublicIpAddrs(SAMPLE_COUNT);
		const publicIpAddrs = classA.concat(classB).concat(classC);
		var header = -1;
		for (var i = 0; i < publicIpAddrs.length; i++) {
			if (i % SAMPLE_COUNT === 0) {
				header++;
			}
			const view = renderer.create(<IPv4View ipv4Addr={publicIpAddrs[i]} classType={classArr[header]} verify />);
			const instance = view.root;
			const ipAddrView = instance.findByType('h3');
			expect(ipAddrView.props.children).toContain('Public');
			expect(ipAddrView.props.style.color).toBe('green');
		}
	});
    
	it('Check Loopback ip addresses', () => {
		const ipAddrs = generateLoopbackIpAddrs(SAMPLE_COUNT);
		for (var i = 0; i < ipAddrs.length; i++) {
			const view = renderer.create(<IPv4View ipv4Addr={ipAddrs[i]} classType={'loopback'} verify />);
			const instance = view.root;
			const typeView = instance.findByProps({ id: 'type' });
			expect(typeView.props.children).toContain('Loopback');
			const ipAddrView = instance.findByType('h3');
			expect(ipAddrView.props.style.color).toBe('red');
		}
	});
    
	it('Check ip addresses for multicast purposes', () => {
		const ipAddrs = generateClassDIpAddrs(SAMPLE_COUNT);
		for (var i = 0; i < ipAddrs.length; i++) {
			const view = renderer.create(<IPv4View ipv4Addr={ipAddrs[i]} classType={'D'} verify />);
			const instance = view.root;
			const typeView = instance.findByProps({ id: 'type' });
			expect(typeView.props.children).toContain('Multicast');
			const ipAddrView = instance.findByType('h3');
			expect(ipAddrView.props.style.color).toBe('red');
		}
	});

	it('Check ip addresses for experimental purposes', () => {
		const ipAddrs = generateClassEIpAddrs(SAMPLE_COUNT);
		for (var i = 0; i < ipAddrs.length; i++) {
			const view = renderer.create(<IPv4View ipv4Addr={ipAddrs[i]} classType={'E'} verify />);
			const instance = view.root;
			const typeView = instance.findByProps({ id: 'type' });
			expect(typeView.props.children).toContain('Experimental purposes');
			const ipAddrView = instance.findByType('h3');
			expect(ipAddrView.props.style.color).toBe('red');
		}
	});
    
	it('Match classes', () => {
		const privateAddr = generatePrivateIpAddrs(SAMPLE_COUNT);
		const publicAddr = generatePublicIpAddrs(SAMPLE_COUNT);
		const classA = privateAddr.classA.concat(publicAddr.classA);
		const classB = privateAddr.classB.concat(publicAddr.classB);
		const classC = privateAddr.classC.concat(publicAddr.classC);
		const classD = generateClassDIpAddrs(SAMPLE_COUNT);
		const classE = generateClassEIpAddrs(SAMPLE_COUNT);
		const loopback = generateLoopbackIpAddrs(SAMPLE_COUNT);

		classA.forEach(function(ip) {
			expect(identify(ip)).toBe('A');
		});

		classB.forEach(function(ip) {
			expect(identify(ip)).toBe('B');
		});

		classC.forEach(function(ip) {
			expect(identify(ip)).toBe('C');
		});

		loopback.forEach(function(ip) {
			expect(identify(ip)).toBe('loopback');
		});

		classD.forEach(function(ip) {
			expect(identify(ip)).toBe('D');
		});

		classE.forEach(function(ip) {
			expect(identify(ip)).toBe('E');
		});
        
		const invalid_ip_addrs = [
			'0.0.0.0',
			'-1.3.54.2',
			'256.32.23.256',
			'A.23.4.12'
		];
		invalid_ip_addrs.forEach(function (ip) {
			expect(identify(ip)).toBe('invalid');
		});
	});
});

function generateClassEIpAddrs(count) {
	// [240-255].[0-255].[0-255].[0-255]
	var ipAddrs = [];
	var tempArr = [];
	for (var i = 0; i < count; i++) {
		tempArr.push(Math.floor(Math.random() * 16) + 240);
		for (var j = 1; j < 4; j++) {
			tempArr.push(Math.floor(Math.random() * 256));
		}
		ipAddrs.push(tempArr.join('.'));
		tempArr = [];
	}
	return ipAddrs;
}

function generateClassDIpAddrs(count) {
	// [224-239].[0-255].[0-255].[0-255]
	var ipAddrs = [];
	var tempArr = [];
	for (var i = 0; i < count; i++) {
		tempArr.push(Math.floor(Math.random() * 16) + 224);
		for (var j = 1; j < 4; j++) {
			tempArr.push(Math.floor(Math.random() * 256));
		}
		ipAddrs.push(tempArr.join('.'));
		tempArr = [];
	}
	return ipAddrs;
}

function generateLoopbackIpAddrs(count) {
	// 127.[0-255].[0-255].[0-255]
	var ipAddrs = [];
	var tempArr = [];
	for (var i = 0; i < count; i++) {
		tempArr.push(127);
		for (var j = 1; j < 4; j++) {
			tempArr.push(Math.floor(Math.random() * 256));
		}
		ipAddrs.push(tempArr.join('.'));
		tempArr = [];
	}
	return ipAddrs;
}

function generatePublicIpAddrs(count) {
	function random(from, to, excludeFrom, excludeTo) {
		var arr = [];
		for (var i = from; i < to; i++) {
			if (i < excludeFrom || i > excludeTo) {
				arr.push(i);
			}
		}
		return arr[Math.floor(Math.random() * arr.length)];
	}
	function generateClassAIPAddrs(count) {
		// [1-126].[0-255].[0-255].[0-255] && !== (10.0.0.0 ~ 10.255.255.255)
		var ipAddrs = [];
		var tempArr = [];
		for (var i = 0; i < count; i++) {
			tempArr.push(random(1, 127, 10, 11));
			for (var j = 1; j < 4; j++) {
				tempArr.push(Math.floor(Math.random() * 256));
			}
			ipAddrs.push(tempArr.join('.'));
			tempArr = [];
		}
		return ipAddrs;
	}

	function generateClassBIPAddrs(count) {
		// [128-191].[0-255].[0-255].[0-255] && !==(172.16.0.0 ~ 172.31.255.255)
		var ipAddrs = [];
		var tempArr = [];
		for (var i = 0; i < count; i++) {
			tempArr.push(random(128, 192, 172, 173));
			tempArr.push(random(0, 256, 16, 32));
			for (var j = 2; j < 4; j++) {
				tempArr.push(Math.floor(Math.random() * 256));
			}
			ipAddrs.push(tempArr.join('.'));
			tempArr = [];
		}
		return ipAddrs;
	}

	function generateClassCIPAddrs(count) {
		// [192-223].[0-255].[0-255].[0-255] && !==(192.168.0.0 ~ 192.168.255.255)
		var ipAddrs = [];
		var tempArr = [];
		for (var i = 0; i < count; i++) {
			tempArr.push(random(192, 224, 192, 193));
			tempArr.push(random(0, 256, 168, 169));
			for (var j = 2; j < 4; j++) {
				tempArr.push(Math.floor(Math.random() * 256));
			}
			ipAddrs.push(tempArr.join('.'));
			tempArr = [];
		}
		return ipAddrs;
	}

	return {
		// eslint-disable-next-line indent
        classA: generateClassAIPAddrs(count),
		classB: generateClassBIPAddrs(count),
		classC: generateClassCIPAddrs(count)
	};
}

function generatePrivateIpAddrs(count) {
	function generateClassAIPAddrs(count) {
		// 10.0.0.0 ~ 10.255.255.255
		var ipAddrs = [];
		var tempArr = [];
		for (var i = 0; i < count; i++) {
			tempArr.push(10);
			for (var j = 1; j < 4; j++) {
				tempArr.push(Math.floor(Math.random() * 256));
			}
			ipAddrs.push(tempArr.join('.'));
			tempArr = [];
		}
		return ipAddrs;
	}

	function generateClassBIPAddrs(count) {
		// 172.16.0.0 ~ 172.31.255.255
		var ipAddrs = [];
		var tempArr = [];
		for (var i = 0; i < count; i++) {
			tempArr.push(172);
			tempArr.push(Math.floor(Math.random() * 16) + 16);
			for (var j = 2; j < 4; j++) {
				tempArr.push(Math.floor(Math.random() * 256));
			}
			ipAddrs.push(tempArr.join('.'));
			tempArr = [];
		}
		return ipAddrs;
	}

	function generateClassCIPAddrs(count) {
		// 192.168.0.0 ~ 192.168.255.255
		var ipAddrs = [];
		var tempArr = [];
		for (var i = 0; i < count; i++) {
			tempArr.push(192);
			tempArr.push(168);
			for (var j = 2; j < 4; j++) {
				tempArr.push(Math.floor(Math.random() * 256));
			}
			ipAddrs.push(tempArr.join('.'));
			tempArr = [];
		}
		return ipAddrs;
	}
    
	return {
		// eslint-disable-next-line indent
        classA: generateClassAIPAddrs(count),
		classB: generateClassBIPAddrs(count),
		classC: generateClassCIPAddrs(count)
	};
}