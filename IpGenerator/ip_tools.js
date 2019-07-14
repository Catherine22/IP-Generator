'use strict'

const MAX_VALUE = 0b11111111
const MIN_VALUE = 0b00000000

const IPV4_ADDR = "Ipv4: "
const NETWORK_IP = "Network ip: "
const BROADCAST_ID = "Broadcast id: "

function generateIpv4 () {
  var ipAddr = ''
  var octet1 = random0To255()
  while (identify(ipAddr) === 'lookback' || identify(ipAddr) === 'invalid') {
    octet1 = random0To255()
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

  return ipAddr
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

function random0To255 () {
  return Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE
}

// Identify class type
function identify (firstOctet) {
  if (firstOctet === 1) return 'invalid'
  else if (firstOctet < 127) return 'A'
  else if (firstOctet === 127) return 'lookback'
  else if (firstOctet < 192) return 'B'
  else if (firstOctet < 224) return 'C'
  else if (firstOctet < 240) return 'D'
  else if (firstOctet <= 255) return 'E'
  else return 'invalid'
}

function onGenerateBtnClicked () {
  const ipv4Addr = generateIpv4()
  document.getElementById('ipv4_address').innerHTML = IPV4_ADDR + ipv4Addr
  document.getElementById('ipv4_network_ip').innerHTML = NETWORK_IP + getNetworkIp(ipv4Addr)
  document.getElementById('ipv4_broadcast_id').innerHTML = BROADCAST_ID + getBroadcastId(ipv4Addr)
}
