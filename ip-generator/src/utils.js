
const MAX_VALUE = 0b11111111;
const MIN_VALUE = 0b00000000;
const QUESTION_MARK = '??'
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
}

function random0To255() {
    return Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE
}

// Identify class type
export function identify(firstOctet) {
    if (firstOctet <= 1) return 'invalid'
    if (firstOctet < 127) return 'A'
    if (firstOctet == 127) return 'loopback'
    if (firstOctet < 192) return 'B'
    if (firstOctet < 224) return 'C'
    if (firstOctet < 240) return 'D'
    if (firstOctet <= 255) return 'E'
    return 'invalid'
}

export function generateIpv4() {
    var ipAddr = ''
    var octet1 = random0To255()
    var classType = identify(octet1)
    while (classType === 'lookback' || classType === 'invalid' || classType === 'D' || classType === 'E') {
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
    while (octet4 == 0 || octet4 == 255) {
        octet4 = random0To255()
    }
    ipAddr += octet4

    return {
        ipv4Addr: ipAddr,
        classType: classType
    }
};

export function getNetworkIp(ipv4) {
    const {
        ipv4Addr,
        classType
    } = ipv4
    var arr = ipv4Addr.split('.')
    switch (classType) {
        case 'A':
            arr.splice(3, 1, MIN_VALUE).join('.')
            break
        case 'B':
            arr.splice(2, 2, MIN_VALUE, MIN_VALUE).join('.')
            break
        case 'C':
            arr.splice(1, 3, MIN_VALUE, MIN_VALUE, MIN_VALUE).join('.')
            break
        default:
            return 'Not defined'
    }
    return arr.join('.')
}

export function getBroadcastId(ipv4) {
    const {
        ipv4Addr,
        classType
    } = ipv4
    var arr = ipv4Addr.split('.')
    switch (classType) {
        case 'A':
            arr.splice(3, 1, MAX_VALUE)
            break
        case 'B':
            arr.splice(2, 2, MAX_VALUE, MAX_VALUE)
            break
        case 'C':
            arr.splice(1, 3, MAX_VALUE, MAX_VALUE, MAX_VALUE)
            break
        default:
            return 'Not defined'
    }
    return arr.join('.')
}

export function getSubnetMask(classType) {
    switch (classType) {
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

export function getGateway(ipv4) {
    const {
        ipv4Addr,
        classType
    } = ipv4
    var arr = ipv4Addr.split('.')
    switch (classType) {
        case 'A':
            arr.splice(3, 1, QUESTION_MARK)
            break
        case 'B':
            arr.splice(2, 2, QUESTION_MARK, QUESTION_MARK)
            break
        case 'C':
            arr.splice(1, 3, QUESTION_MARK, QUESTION_MARK, QUESTION_MARK)
            break
        default:
            return 'Not defined'
    }
    return arr.join('.')
}

export function isIpv4Addr(ipAddr) {
    // 1-255.0-255.0-255.0-255
    const reg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/ig
    return reg.test(ipAddr)
}

export function isPrivateIp(ipv4) {
    function isInOfTheRange(value, from, to) {
        return (value >= parseInt(from)) && (value <= parseInt(to))
    }
    const {
        ipv4Addr,
        classType
    } = ipv4

    const arr = ipv4Addr.split('.')
    var from, to

    switch (classType) {
        case 'A':
            from = PRIVATE_IP_ADDRESSES.classA.from.split('.')
            to = PRIVATE_IP_ADDRESSES.classA.to.split('.')
            break
        case 'B':
            from = PRIVATE_IP_ADDRESSES.classB.from.split('.')
            to = PRIVATE_IP_ADDRESSES.classB.to.split('.')
            break
        case 'C':
            from = PRIVATE_IP_ADDRESSES.classC.from.split('.')
            to = PRIVATE_IP_ADDRESSES.classC.to.split('.')
            break
        default:
            return false
    }
    var i = 0
    while (arr[i]) {
        if (!isInOfTheRange(arr[i], from[i], to[i])) {
            return false
        }
        i++
    }

    return true
}
