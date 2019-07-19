import React, {
	Component
} from 'react';
import {
	IPV4_ADDR,
	NETWORK_IP,
	BROADCAST_IP,
	LOOPBACK_ADDR,
	MULTICAST,
	EXPERIMENTAL_PURPOSES,
	INVALID,
	VISIBILITY_MODIFIER,
	CLASS,
	HOSTS
} from '../en';
import {
	isIpv4Addr,
	isPrivateIp,
    calSubnet,
    decimalToBinary
} from '../utils';


class SubnettingResult extends Component {
	render() {
		const {
			ipv4Addr,
			classType
		} = this.props.subnetIp;

		const ipv4 = {
			ipv4Addr,
			classType
		};

		var ipAddressStr = IPV4_ADDR + ipv4Addr;
		var hosts;
		var networkIp;
		var broadcastIp;
		var color = 'black';
		var type = null;
		var isValid = isIpv4Addr(ipv4Addr);
		if (isValid) {
			switch (classType) {
			case 'loopback':
				type = LOOPBACK_ADDR;
				break;
			case 'D':
				type = CLASS + classType + ' -> ' + MULTICAST;
				break;
			case 'E':
				type = CLASS + classType + ' -> ' + EXPERIMENTAL_PURPOSES;
				break;
			default:
				type = CLASS + classType;
				try {
					const result = calSubnet(this.props.subnetIp);
					ipAddressStr = (isPrivateIp(ipv4) ? VISIBILITY_MODIFIER.PRIVATE : VISIBILITY_MODIFIER.PUBLIC) + ipAddressStr;
					hosts = HOSTS + result.hosts;
					networkIp = NETWORK_IP + result.networkIp;
					broadcastIp = BROADCAST_IP + result.broadcastIp;
				} catch (e) {
					isValid = false;
					ipAddressStr = INVALID + ':' + e;
				}
			}
			color = (isValid) ? 'green' : 'red'; 
		} else {
			color = 'red';
			ipAddressStr = INVALID;
		}
		return (
			<div>
				<h3 id="ip_address" style={{ color: color }}>{ipAddressStr}</h3>
				{isValid && <div id="binary_ip_addr">{decimalToBinary(ipv4Addr)}</div>}
				{type && <div id="type">{type}</div>}
				{hosts && <div id="hosts">{hosts}</div>}
				{networkIp && <div id="network_ip">{networkIp}</div>}
				{broadcastIp && <div id="broadcast_ip">{broadcastIp}</div>}
			</div>
		);
	}
}

export {
	SubnettingResult
};
