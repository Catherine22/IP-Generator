'use strict'

class Rerender {
  constructor () {
    window.onload = function () {
      document.getElementById('ipv4_address').innerHTML = 'IP address: '
      document.getElementById('ipv4_network_ip').innerHTML = 'Network id: '
      document.getElementById('ipv4_broadcast_id').innerHTML = 'Broadcast id: '
      document.getElementById('ipv4_subnet_mask').innerHTML = 'Subnet mask: '
      document.getElementById('ipv4_gateway').innerHTML = 'Gateway: '
    }
  }
}

new Rerender()
