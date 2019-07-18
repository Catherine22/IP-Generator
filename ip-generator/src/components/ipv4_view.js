import React, {
    Component
} from 'react';
import PropTypes from 'prop-types'
import {
    IPV4_ADDR,
    NETWORK_IP,
    BROADCAST_ID,
    SUBNET_MASK,
    GATEWAY,
    LOOPBACK_ADDR,
    MULTICAST,
    EXPERIMENTAL_PURPOSES,
    INVALID,
    VISIBILITY_MODIFIER
} from '../en';
import {
    getNetworkIp,
    getBroadcastId,
    getSubnetMask,
    getGateway,
    isIpv4Addr,
    isPrivateIp
} from '../utils'


class IPv4View extends Component {
    static defaultPropTypes = {
        ipv4Addr: PropTypes.string.isRequired,
        classType: PropTypes.string.isRequired,
        verify: PropTypes.bool
    };

    render() {
        const {ipv4Addr, classType, verify} = this.props;
        const ipv4 = {
            ipv4Addr,
            classType
        };
        var ipAddressStr = IPV4_ADDR + ipv4Addr;
        var color = 'black';
        var type = null;
        var isValid = true;
        if (verify) {
             if ((isIpv4Addr(ipv4Addr))) {
                 switch (classType) {
                     case 'loopback':
                         isValid = false;
                         type = LOOPBACK_ADDR;
                         break;
                     case 'D':
                         isValid = false;
                         type = MULTICAST;
                         break;
                     case 'E':
                         isValid = false;
                         type = EXPERIMENTAL_PURPOSES;
                         break;
                     default:
                         isValid = true;
                         ipAddressStr = (isPrivateIp(ipv4) ? VISIBILITY_MODIFIER.PRIVATE : VISIBILITY_MODIFIER.PUBLIC) + ipAddressStr;
                 }
                 color = (isValid) ? 'green' : 'red';
             } else {
                 isValid = false;
                 color = 'red';
                 ipAddressStr = INVALID;
             }
        }

        const networkIp = NETWORK_IP + getNetworkIp(ipv4);
        const broadcastId = BROADCAST_ID + getBroadcastId(ipv4);
        const subnetMask = SUBNET_MASK + getSubnetMask(classType);
        const gateway = GATEWAY + getGateway(ipv4)

        return (
            <div>
                <h3 id="ip_address" style={{color: color}}>{ipAddressStr}</h3>
                {isValid && ipv4Addr && <div id="network_ip">{networkIp}</div>}
                {type && <div id="type">{type}</div>}
                {isValid && ipv4Addr && <div id="broadcast_id">{broadcastId}</div>}
                {isValid && ipv4Addr && <div id="subnet_mask">{subnetMask}</div>}
                {isValid && ipv4Addr && <div id="gateway">{gateway}</div>}
            </div>
        )
    }
}

export {
    IPv4View
};
