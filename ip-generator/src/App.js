import React, { Component } from 'react';
import {
  IPv4View,
  IPv4InputField,
  SubnetInputField,
  SubnettingResult
} from './components'
import {
  generateIpv4,
  identify
} from './utils'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      randomIp: {
        ipv4Addr: null,
        classType: null
      },
      givenIp: {
        ipv4Addr: null,
        classType: null
      },
      subnetIp: {
        ipv4Addr: null,
        classType: null,
        subnet: null
      }
    }
  }

  componentWillMount() {
    this.onGenerateBtnClicked()
  }

  render() {
    return (
      <div className="App">
        {/* Generate a random ip address */}
        <h1 style={{color: 'dodgerblue'}}>Welcome to Ip Generator</h1>
        <IPv4View ipv4Addr = {this.state.randomIp.ipv4Addr} classType = {this.state.randomIp.classType} />
        <br/>
        <button onClick={this.onGenerateBtnClicked}>Reset</button>

        {/* verify the input ip address */}
        <h2> IPv4 Address Validation </h2>
       <IPv4InputField onClick={this.onVerifyIpAddr}/>
       <br/>
       {this.state.givenIp.ipv4Addr && 
       <IPv4View ipv4Addr = {this.state.givenIp.ipv4Addr} classType = {this.state.givenIp.classType} verify />
       }

       <h2> Subnetting </h2>
       <SubnetInputField onClick={this.onVerifySubnet}/>
        {this.state.subnetIp.ipv4Addr && <SubnettingResult subnetIp = {this.state.subnetIp}/>}
      </div>
    );
  }

  onGenerateBtnClicked = () => {
    const ipv4 = generateIpv4();
    this.setState({
      randomIp: {
        ipv4Addr: ipv4.ipv4Addr,
        classType: ipv4.classType
      }
    });
  }

  onVerifyIpAddr = (ipv4Addr) => {
    const classType = identify(ipv4Addr);
    this.setState({
      givenIp: {
        ipv4Addr,
        classType
      }
    });
  }

  onVerifySubnet = (ipv4) => {
    const {
      ipAddr,
      subnet
    } = ipv4;

    const classType = identify(ipAddr);
    this.setState({
      subnetIp: {
        ipv4Addr: ipAddr,
        classType,
        subnet
      }
    });
  }
}

export default App;
