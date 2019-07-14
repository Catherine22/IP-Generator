'use strict'

const MAX_VALUE = 0b11111111
const MIN_VALUE = 0b00000000

const IPV4_ADDR = 'Ipv4: '
const NETWORK_IP = 'Network ip: '
const BROADCAST_ID = 'Broadcast id: '
const SUBNET_MASK = 'Subnet mask: '
const INVALID = 'invalid'
const LOOPBACK_ADDR = 'Loopback Address'

function generateIpv4 () {
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
  while (octet4 == 0 || octet4 == 255) {
    octet4 = random0To255()
  }
  ipAddr += octet4

  return {
    ipv4Addr: ipAddr,
    classType: classType
  }
}

function getNetworkIp (ipAddr) {
  var arr = ipAddr.split('.')
  arr.pop()
  arr.push(MIN_VALUE)
  return arr.join('.')
}

function getBroadcastId (ipAddr) {
  var arr = ipAddr.split('.')
  arr.pop()
  arr.push(MAX_VALUE)
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

  if (isIpv4Addr(ipAddr)) {
    const classType = identify(ipAddr.split('.')[0])
    if (classType === 'loopback') {
      document.getElementById('input_ipv4_address').style.color = 'green'
      document.getElementById('is_ipv4_valid').style.color = 'green'
      document.getElementById('is_ipv4_valid').innerHTML = LOOPBACK_ADDR
    } else {
      document.getElementById('input_ipv4_address').style.color = 'green'
      document.getElementById('input_ipv4_network_ip').innerHTML = NETWORK_IP + getNetworkIp(ipAddr)
      document.getElementById('input_ipv4_broadcast_id').innerHTML = BROADCAST_ID + getBroadcastId(ipAddr)
      document.getElementById('input_ipv4_subnet_mask').innerHTML = SUBNET_MASK + getSubnetMask(classType)
    }
  } else {
    document.getElementById('input_ipv4_address').style.color = 'red'
    document.getElementById('is_ipv4_valid').style.color = 'red'
    document.getElementById('is_ipv4_valid').innerHTML = INVALID
  }
  document.getElementById('input_ipv4_address').innerHTML = IPV4_ADDR + ipAddr
}

function onGenerateBtnClicked () {
  const {
    ipv4Addr,
    classType
  } = generateIpv4()
  document.getElementById('ipv4_address').innerHTML = IPV4_ADDR + ipv4Addr
  document.getElementById('ipv4_network_ip').innerHTML = NETWORK_IP + getNetworkIp(ipv4Addr)
  document.getElementById('ipv4_broadcast_id').innerHTML = BROADCAST_ID + getBroadcastId(ipv4Addr)
  document.getElementById('ipv4_subnet_mask').innerHTML = SUBNET_MASK + getSubnetMask(classType)
}
