import React, { Component } from 'react';
import {
  IPv4View,
  IPv4InputField
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
      }
    }
  }

  componentWillMount() {
    this.onGenerateBtnClicked()
  }

  render() {
    return (
      <div className="App">
        <h1 style={{color: 'dodgerblue'}}>Welcome to Ip Generator</h1>
        <IPv4View ipv4Addr = {this.state.randomIp.ipv4Addr} classType = {this.state.randomIp.classType} />
        <br/>
        <button onClick={this.onGenerateBtnClicked}>Reset</button>

        <h2> IPv4 Address Validation </h2>
       <IPv4InputField onClick={this.onVerifyIpAddr}/>
       <br/>
       {this.state.givenIp.ipv4Addr && <IPv4View ipv4Addr = {this.state.givenIp.ipv4Addr} classType = {this.state.givenIp.classType} verify />}
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
    })
  }

  onVerifyIpAddr = (ipv4Addr) => {
    const classType = identify(ipv4Addr.split('.')[0])
    this.setState({
      givenIp: {
        ipv4Addr,
        classType
      }
    })
  }
}

export default App;
