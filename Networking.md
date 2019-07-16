# Networking

## A piece of data
1 bit: 0 or 1       
1 Byte: 8 bits, E.g. An alphabet is 1 Byte      

| speed | data |
| -- | -- |
| 1024 bits = 1 kilo bits = 1Kb | 1024 Byte = 1 kilo Byte = 1KB |
| 1024 Kb = 1 mega bits = 1 Mb | 1024 KB = 1 mega Byte = 1 MB |
| 1024 Mb = 1 giga bits = 1 Gb | 1024 MB = 1 mega Byte = 1 GB |
| 1024 Gb = 1 tera bits = 1 Tb | 1024 GB = 1 tera Byte = 1 TB |

> Q: How long will it take for a 128 KB file to go access at 1 Mbps?      
> A:      
> 1 Mbps = 1 Mb/s = 1024 Kb/s     
> 128 KB = 128 * 8 Kb    
> It will take 128 * 8 / 1024 = 1 (sec)       

## TCP/IP Model & OSI Model
![img](./res/osi_tcp_ip_models.png)     

> How do you remember it?       
> OSI model:      
> Please Do Not Throw Sausage Pizza Away      
> All Pizzas Seem To Need Double Pepperoni        
> 
> TCP/IP model:       
> TCP/IP comes in "A TIN"

#### 7. Application Layer
1. Communicate with "network aware" application.       
2. All the protocols work on this layer: HTTP, SMTP, FTP, TFTP, DNS, etc.       
#### 6. Presentation Layer
1. Convert and encrypt data.

#### 5. Session Layer
1. A layer where construction, direction and conclusion of connection between devices occur.        
2. Support multiple types of connections.        
3. Be responsible for authentication and reconnection       


#### 4. Transport Layer
1. Be responsible for transmission of data across network connections.     
2. Coordinate how much data to send, how fast, where it goes, ect.      
3. Of the most widely known protocols for internet applications, these services may be provided by TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).        
4. Other protocols may provide digital capability including air recovery, data flow and retransmission.     

#### 3. Network Layer
1. Handle the routing of the data.       
2. ARP (Address Resolution Protocol): Map between logical addresses and physical addresses.     


#### 2. Data Link Layer
1. The most complex layer.       
2. Be divided into two sublayers - MAC (Media Access Control) and LLC (Logical Link Control).      
3. Set up links across the physical network. When this layer receives data from a physical layers, it packages the bits into data frames.       
4. Manage physical addressing methods for the MAC or LLC layers.        

#### 1. Physical Layer
1. Network cables, power plugs, cable pinouts, wireless radio frequencies, connectors, transceivers, receivers, repeaters, pulses of light, electric voltages, etc.     
2. Transmit the digital data bits from the source or sending devices' physical layer over network communication media, which can be electrical,  mechanical or radio to the receiving or destination devices' physical layer. 


## IP, Internet Protocol

![img](./res/ipv4.png)     

1. 4 octet      
Octet: an octet is nothing but an 8       
```192.168.0.11``` = ```11000000 10101000 00000000 00001011```       

2. 5 classes        
IPv4 classes identified by the first octet.     
Class A: 1 - 126        
Class B: 128 - 191      
Class C: 192 - 223      
Class D: 224 - 239      
Class E: 240 - 255      

We've been solely dealing with class A, B and C. Class D is used for multi-cast and class E is reserved for experimental purposes.     

```127.X.X.X``` is used for loopback        

3. 0 - 255      
0 (```00000000```) - 255 (```11111111```)       

4. 32 bits      
5. Host/Net     
```A.A.A.B```: A (the first three octets) is the net part, and B is the host part

### IPv4 Address
The 4th version of internet protocol        

### Private IP Addresses
Class A: 10.0.0.0 ~ 10.255.255.255 (16,777,261)      
Class B: 172.16.0.0 ~ 172.31.255.255 (1,048,576)        
Class C: 192.168.0.0 ~ 192.168.255.255 (655,36)     

#### Class C ip address
```
192.168.100.host
```
- Network id: 192.168.100.0       
- Broadcast id: 192.168.100.255     
- A valid ip address starts from ```192.168.100.1``` to ```192.168.100.254```     
- Imagine that ```192.168.100``` is like a hotel with 254 (2^8-2) rooms  (hosts). 

#### Class B ip address
```
172.123.host.host
```
- Network id: 172.123.0.0        
- Broadcast id: 172.123.255.255     
- valid ip addresses start from ```172.123.0.1``` to ```172.123.255.254```        
- A hotel with 65,534 (2^16-2) rooms (hosts).

#### Class A ip address
```
100.host.host.host
```
- Network id: 100.0.0.0       
- Broadcast id: 100.255.255.255     
- valid ip addresses start from ```100.0.0.1``` to ```100.255.255.254```        
- A hotel with 2,097,150 (2^24-2) rooms (hosts).

### Subnet Mask
- Subnet mask is decided by the class. A class C ip address, the subnet class is ```255.255.255.0``` (```11111111 11111111 11111111 00000000```)      
- If you see something like ```192.168.0.11/24```, the CIDR ```/24``` means that the subnet mask has 24 ```1```. A subnet mask with 24 ```1``` is nothing but a class C ip address.       

| class | subnet mask |
| -- | -- |
| C | 255.255.255.0 |
| B | 255.255.0.0 |
| A | 255.0.0.0 |


### Router, gateway     
NOTICE, gateway and ip address have to be in the same network, i.e. if the ip address is ```192.168.100.11```, gateway must be ```192.168.100.xx```


> IP Generator: https://github.com/Catherine22/Notes/tree/master/IpGenerator

## IPv6
The 6th version

## Subnetting
| class | subnet mask | how many ```1``` in it |
| -- | -- | -- |
| C | 255.255.255.0 | 24+ |
| B | 255.255.0.0 | 16+ |
| A | 255.0.0.0 | 8+ |

### Class C
E.g. 
ip address: ```192.168.100.3/25```        
subnet mask: ```255.255.255.0```     

1. Convert to binary        
-> 11111111.11111111.11111111.xxxxxxxx       

2. 25 ```1```       
-> ```11111111.11111111.11111111.1```xxxxxxx        

3. 7 bits left, i.e. we have 2^7 - 2 = 126 hosts (one for network id, the other for broadcast ip)     

4. 2 subnets       
- network id 1: ```192.168.100.0/25```     
- broadcast ip 1: ```192.168.100.127/25```     
- network id 2: ```192.168.100.128/25```     
- broadcast ip 2: ```192.168.100.255/25```     

E.g.
ip address: ```192.168.100.3/26```        

- 2^6 - 2 = 62 hosts        
- 4 subnets     

| subnet | network id | broadcast |
| -- | -- | -- |
| 1 | 192.168.100.0/26 | 192.168.100.63/26 |
| 2 | 192.168.100.64/26 | 192.168.100.127/26 |
| 3 | 192.168.100.128/26 | 192.168.100.191/26 |
| 4 | 192.168.100.192/26 | 192.168.100.255/26 |


#### Tips

Subnet mask = 255.255.255.SUBNET_VALUE
| Borrowed bits | **Subnet value** | Subnets | Hosts | CIDR | Block size |
| -- | -- | -- | -- | -- | -- |
| 1 | **128 (10000000)** | 2 | 126 | /25 | 128 |
| 2 | **192 (11000000)** | 4 | 62 | /26 | 64 |
| 3 | **224 (11100000)** | 8 | 30 | /27 | 32 |
| 4 | **240 (11110000)** | 16 | 14 | /28 | 16 |
| 5 | **248 (11111000)** | 32 | 6 | /29 | 8 |
| 6 | **252 (11111100)** | 64 | 2 | /30 | 4  |


Q1.     
1. Create 3 sub-networks        
2. Use a class C ip address: 192.168.1.0        
3. Determine the network id and broadcast id of all the subnets     

A.      
| subnet | network id | broadcast |
| -- | -- | -- |
| 1 | 192.168.1.0/26 | 192.168.1.63/26 |
| 2 | 192.168.1.64/26 | 192.168.1.127/26 |
| 3 | 192.168.1.128/26 | 192.168.1.191/26 |
| 4 | 192.168.1.192/26 | 192.168.1.255/26 |


Q2.     
Find the network id and broadcast id of this ip address: 192.168.225.212/27     

A.      
8 subnets -> block size = 32
-> last octets of network id: 0, 32, 64, 128, 160, 192, 224     
-> last octets of broadcast id: 31, 63, 127, 159, 191, 223, 255     

The answer is network id = 192.168.225.192/27; broadcast id = 192.168.335.223/27

Q3.     
Design a network with 3 networks: Marketing, Sales and Management.      
Marketing requires 60 computers and Sales requires 100 computers     
Management requires 34 computers.       

A.      
4 subnets - Marketing and Management have 62 hosts respectively and Managements has 126 hosts (2 networks)      

| dept. | network id | broadcast |
| -- | -- | -- |
| Marketing | 192.168.1.0/26 | 192.168.1.63/26 |
| Management | 192.168.1.64/26 | 192.168.1.127/26 |
| Sales | 192.168.1.128/26 | 192.168.1.255/26 |


## References
[Full Series | 200-125 CCNA v3.0 | Free Cisco Video Training 2018 | Networking Inc.](https://www.youtube.com/playlist?list=PLh94XVT4dq02frQRRZBHzvj2hwuhzSByN)