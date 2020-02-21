import React, { Component } from 'react';

class TotalRow extends Component {
		
  //render total units owned and total purchase price
  render() {
    return (
        <tr>
		  <td></td>
		  <td></td>
			  
		  <td>
			<b>Total Purchase Units: {this.props.total_units_owned}</b>
		  </td>
			  
		  <td>
			<b>Total Purchase Price: {this.props.total_paid_aud}</b>
		  </td>
		  
		  <td></td>
		  <td></td>
		</tr>
    );
  }
}

export default TotalRow;