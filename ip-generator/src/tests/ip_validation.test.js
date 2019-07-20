import {
	isIpv4Addr
} from '../utils';

test('verify ip addresses', () => {
	var validIpArr = [];
	for (var j=0; j<100;j++) {
		// 1 - 255
		validIpArr.push(Math.floor(Math.random() * 255) + 1);
		for (var i = 1; i < 4; i++) {
			// 0 - 255
			validIpArr.push(Math.floor(Math.random() * 256));
		}
		expect(isIpv4Addr(validIpArr.join('.'))).toBe(true);
		validIpArr = [];
	}
    
	const invalidIpAddrs = [
		'0.0.0.0',
		'2.01.1.1',
		'0.32.4.1',
		'-1.3.54.2',
		'144.32.23.256',
		'A.23.4.12',
		'23.024.12.1'
	];
	invalidIpAddrs.forEach(function (ipAddr) {
		expect(isIpv4Addr(ipAddr)).toBe(false);
	});
});