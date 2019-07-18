import React, {
    Component
}
from 'react';
import PropTypes from 'prop-types'


class IPv4InputField extends Component {
    static defaultPropTypes = {
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = ({
            ipAddr: new Array(4)
        });
    }

    render() {
        return (
            <form>
                <input type="number" min="0" id="octet1" max="255" onChange={(event)=>this.updateIpAddr(0, event)}/>
                <label>.</label>
                <input type="number" min="0" id="octet2" max="255" onChange={(event)=>this.updateIpAddr(1, event)}/>
                <label>.</label>
                <input type="number" min="0" id="octet3" max="255" onChange={(event)=>this.updateIpAddr(2, event)}/>
                <label>.</label>
                <input type="number" min="0" id="octet4" max="255"onChange={(event)=>this.updateIpAddr(3, event)}/>
                <input type="button" value="Verify" onClick = {()=>this.props.onClick(this.formatIp())} />
            </form>
        )
    }

     updateIpAddr = (index, event) => {
         var ipAddr = this.state.ipAddr;
         ipAddr[index] = event.target.value;
         this.setState({ipAddr});
     }

     formatIp() {
         return '' + this.state.ipAddr.join('.');
     }
}

export {
    IPv4InputField
};
