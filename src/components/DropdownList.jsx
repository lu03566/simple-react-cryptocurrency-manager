//Imports
import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

//Preset options for cryptocurrency type
const options = ["All", "Bitcoin", "Ethereum", "EOS", "Litecoin"];
	
export default class DropdownMenu extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: options[0] // default selected value
		}
	}

	//Update select state based on user's selection
	handleSelect(eventKey, event) {
		this.setState({ selectedOption: options[eventKey] }, function(){
		   this.props.data(this.state.selectedOption); 
		});
	}
 
  render() {
    return (
		<div className="select_option">
			  <DropdownButton title={this.state.selectedOption} id="document-type" onSelect={this.handleSelect.bind(this)}>
			  
				{options.map((opt, i) => (
				  <Dropdown.Item key={i} eventKey={i}>
					{opt}
				  </Dropdown.Item>
				  
				))}
				
			  </DropdownButton>
		</div>
	)
  }
}
