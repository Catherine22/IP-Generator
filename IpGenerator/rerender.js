'use strict'

class Rerender {
    constructor() {
        window.onload = function () {
            document.getElementById('ipv4_address').innerHTML = "Ipv4: "
            document.getElementById('ipv4_network_ip').innerHTML = "Network ip: "
            document.getElementById('ipv4_broadcast_id').innerHTML = "Broadcast id: "
        }
    }
}

new Rerender()