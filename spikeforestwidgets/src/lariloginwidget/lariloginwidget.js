import React from "react";
import ReactDOM from "react-dom";
import { SelectList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css';

class LariLoginWidget extends React.Component {
	constructor(props) {
    super(props);
    this.state = {selected_server:null,LARI_ID:'',LARI_PASSCODE:''};
    this._passcode_lookup={};

    this.handle_passcode_change = this.handle_passcode_change.bind(this);
  }

  handle_passcode_change(event) {
		let passcode=event.target.value;
		let state=JSON.parse(JSON.stringify(this.state));
		if (state.LARI_ID) {
			state.LARI_PASSCODE=passcode;
			this._passcode_lookup[this.state.LARI_ID]=passcode;
		}
		this.setState(state);
		this.props.onStateChanged(state);
  }

  render() {
  	let {
  		servers
  	} = this.props;

  	if (!servers) {
  		servers=default_servers();
  	}

  	let ListItem = ({ item }) => (
		  <span>
		    {item.label}
		  </span>
		);

		let div_style={
			overflow:'auto',
			height:150,
			width:600
		};

		let passcode_element=<span></span>
		if ((this.state.selected_server)&&(this.state.LARI_ID)) {
			passcode_element=
				<span>
				  Passcode for {(this.state.selected_server||{}).label}:
				  <input type="password"
				  	onChange={this.handle_passcode_change}
				  	value={this.state.LARI_PASSCODE}
				  >
				  </input>
				</span>;
		}

  	return (
  		<span>
	  		<h3>Select lari server</h3>
	  		<div style={div_style}>
				  <SelectList
				    data={servers}
				    textField='label'
				    valueField='LARI_ID'
				    value={this.state.LARI_ID}
				    onChange={
				    	(value) => {
				    		let state={ 
				    			selected_server:value,
				    			LARI_ID:value.LARI_ID||'',
				    			LARI_PASSCODE:this._passcode_lookup[value.LARI_ID||'']||''
				    		};
				    		console.log('----',this._passcode_lookup,state);
				    		this.setState(state);
				    		console.log('test2');
				    		this.props.onStateChanged(state);
				    		console.log('test3');
				    	}
				    }
				    itemComponent={ListItem}
				  />
			  </div>
		  {passcode_element}
		  </span>
		);
	}
}

function default_servers() {
	let servers=[];
	servers.push({
		label:'local computer',
		LARI_ID:''
	});
	servers.push({
		label:'Flatiron cluster',
		LARI_ID:'fdb573a66f50'
	});
	servers.push({
		label:"Jeremy's laptop",
		LARI_ID:'cb48a51bf9e5'
	});
	return servers;
}

module.exports=LariLoginWidget