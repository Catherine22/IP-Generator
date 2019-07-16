'use strict'

const MAX_VALUE = 0b11111111
const MIN_VALUE = 0b00000000

const IPV4_ADDR = 'IP address: '
const NETWORK_IP = 'Network id: '
const BROADCAST_ID = 'Broadcast id: '
const SUBNET_MASK = 'Subnet mask: '
const GATEWAY = 'Gateway: '
const INVALID = 'invalid'
const LOOPBACK_ADDR = 'Loopback Address'
const MULTICAST = 'Multicast'
const EXPERIMENTAL_PURPOSES = 'Experimental purposes'
const QUESTION_MARK = '??'
const VISIBILITY_MODIFIER = {
  PRIVATE: 'Private ',
  PUBLIC: 'Public '
}

const PRIVATE_IP_ADDRESSES = {
  classA: { from: '10.0.0.0', to: '10.255.255.255' },
  classB: { from: '172.16.0.0', to: '172.31.255.255' },
  classC: { from: '192.168.0.0', to: '192.168.255.255' }
}

function generateIpv4 () {
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
}

function getNetworkIp (ipv4) {
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

function getBroadcastId (ipv4) {
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

function getSubnetMask (classType) {
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

function getGateway (ipv4) {
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

function random0To255 () {
  return Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE
}

// Identify class type
function identify (firstOctet) {
  if (firstOctet <= 1) return 'invalid'
  if (firstOctet < 127) return 'A'
  if (firstOctet == 127) return 'loopback'
  if (firstOctet < 192) return 'B'
  if (firstOctet < 224) return 'C'
  if (firstOctet < 240) return 'D'
  if (firstOctet <= 255) return 'E'
  return 'invalid'
}

function isIpv4Addr (ipAddr) {
  // 1-255.0-255.0-255.0-255
  const reg = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/ig
  return reg.test(ipAddr)
}

function isPrivateIp (ipv4) {
  function isInOfTheRange (value, from, to) {
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

function onSubmitGivenIpAddr () {
  const ipAddr = document.getElementById('octet1').value + '.' +
    document.getElementById('octet2').value + '.' +
    document.getElementById('octet3').value + '.' +
    document.getElementById('octet4').value

  // refresh the view
  document.getElementById('input_ipv4_address').innerHTML = ''
  document.getElementById('is_ipv4_valid').innerHTML = ''
  document.getElementById('input_ipv4_network_ip').innerHTML = ''
  document.getElementById('input_ipv4_broadcast_id').innerHTML = ''
  document.getElementById('input_ipv4_subnet_mask').innerHTML = ''
  document.getElementById('input_ipv4_gateway').innerHTML = ''

  if (isIpv4Addr(ipAddr)) {
    const classType = identify(ipAddr.split('.')[0])
    const ipv4 = {
      ipv4Addr: ipAddr,
      classType: classType
    }
    if (classType === 'loopback') {
      document.getElementById('input_ipv4_address').style.color = 'green'
      document.getElementById('input_ipv4_address').innerHTML = IPV4_ADDR + ipAddr
      document.getElementById('is_ipv4_valid').style.color = 'green'
      document.getElementById('is_ipv4_valid').innerHTML = LOOPBACK_ADDR
    } else if (classType === 'D') {
      document.getElementById('input_ipv4_address').style.color = 'green'
      document.getElementById('input_ipv4_address').innerHTML = IPV4_ADDR + ipAddr
      document.getElementById('is_ipv4_valid').style.color = 'green'
      document.getElementById('is_ipv4_valid').innerHTML = MULTICAST
    } else if (classType === 'E') {
      document.getElementById('input_ipv4_address').style.color = 'green'
      document.getElementById('input_ipv4_address').innerHTML = IPV4_ADDR + ipAddr
      document.getElementById('is_ipv4_valid').style.color = 'green'
      document.getElementById('is_ipv4_valid').innerHTML = EXPERIMENTAL_PURPOSES
    } else {
      document.getElementById('input_ipv4_address').style.color = 'green'
      document.getElementById('input_ipv4_address').innerHTML = (isPrivateIp(ipv4) ? VISIBILITY_MODIFIER.PRIVATE : VISIBILITY_MODIFIER.PUBLIC) + IPV4_ADDR + ipAddr
      document.getElementById('input_ipv4_network_ip').innerHTML = NETWORK_IP + getNetworkIp(ipv4)
      document.getElementById('input_ipv4_broadcast_id').innerHTML = BROADCAST_ID + getBroadcastId(ipv4)
      document.getElementById('input_ipv4_subnet_mask').innerHTML = SUBNET_MASK + getSubnetMask(ipv4.classType)
      document.getElementById('input_ipv4_gateway').innerHTML = GATEWAY + getGateway(ipv4)
    }
  } else {
    document.getElementById('input_ipv4_address').style.color = 'red'
    document.getElementById('is_ipv4_valid').style.color = 'red'
    document.getElementById('is_ipv4_valid').innerHTML = INVALID
  }
}

function onGenerateBtnClicked () {
  const ipv4 = generateIpv4()
  document.getElementById('ipv4_address').innerHTML = IPV4_ADDR + ipv4.ipv4Addr
  document.getElementById('ipv4_network_ip').innerHTML = NETWORK_IP + getNetworkIp(ipv4)
  document.getElementById('ipv4_broadcast_id').innerHTML = BROADCAST_ID + getBroadcastId(ipv4)
  document.getElementById('ipv4_subnet_mask').innerHTML = SUBNET_MASK + getSubnetMask(ipv4.classType)
  document.getElementById('ipv4_gateway').innerHTML = GATEWAY + getGateway(ipv4)
}
