'use strict'

const MAX_VALUE = 0b11111111
const MIN_VALUE = 0b00000000

const IPV4_ADDR = "Ipv4: "
const NETWORK_IP = "Network ip: "
const BROADCAST_ID = "Broadcast id: "
const SUBNET_MASK = "Subnet mask: "

function generateIpv4() {
    var ipAddr = ''
    var octet1 = random0To255()
    var classType = identify(octet1)
    while (classType === 'lookback' || classType === 'invalid') {
        octet1 = random0To255()
        classType = identify(octet1)
    }
    ipAddr += octet1

    ipAddr += '.'
    ipAddr += random0To255()

    ipAddr += '.'
    ipAddr += random0To255()

    ipAddr += '.'
    var octet4 = random0To255()
    while (octet4 === 0 || octet4 === 255) {
        octet4 = random0To255()
    }
    ipAddr += octet4

    return {
        ipv4Addr: ipAddr,
        classType: classType
    }
}

function getNetworkIp(ipAddr) {
    var arr = ipAddr.split('.')
    arr.pop()
    arr.push(MIN_VALUE)
    return arr.join('.')
}

function getBroadcastId(ipAddr) {
    var arr = ipAddr.split('.')
    arr.pop()
    arr.push(MAX_VALUE)
    return arr.join('.')
}

function getSubnetMask(classType) {
    switch(classType) {
        case 'A':
            return '255.0.0.0'
        case 'B':
            return '255.255.0.0'
        case 'C':
            return '255.255.255.0'
        default:
            return 'Not defined'
    }
}

function random0To255() {
    return Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE
}

// Identify class type
function identify(firstOctet) {
    if (firstOctet === 1) return 'invalid'
    if (firstOctet < 127) return 'A'
    if (firstOctet === 127) return 'lookback'
    if (firstOctet < 192) return 'B'
    if (firstOctet < 224) return 'C'
    if (firstOctet < 240) return 'D'
    if (firstOctet <= 255) return 'E'
    return 'invalid'
}

function onGenerateBtnClicked() {
    const {
        ipv4Addr,
        classType
    } = generateIpv4()
    document.getElementById('ipv4_address').innerHTML = IPV4_ADDR + ipv4Addr
    document.getElementById('ipv4_network_ip').innerHTML = NETWORK_IP + getNetworkIp(ipv4Addr)
    document.getElementById('ipv4_broadcast_id').innerHTML = BROADCAST_ID + getBroadcastId(ipv4Addr)
    document.getElementById('ipv4_subnet_mask').innerHTML = SUBNET_MASK + getSubnetMask(classType)
}
