import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase.config';

class TableRow extends Component {
	
	constructor(props) {
		super(props);
		this.delete = this.delete.bind(this);
	}

	//delete data from database
	delete() {
		const itemsRef = firebase.database().ref('transactions/'+this.props.obj.id);
		itemsRef.remove()
		.then(function() {
			console.log("Remove succeeded.")
		})
		.catch(function(error) {
			console.log("Remove failed: " + error.message)
		});
	}
	
  //render single row of record
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.index}
          </td>
          <td>
            {this.props.obj.cryptocurrency_type}
          </td>
          <td>
            {this.props.obj.purchase_unit}
          </td>
          <td>
            {this.props.obj.purchase_price_aud}
          </td>
          <td>
			<Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
		  </td>
        </tr>
    );
  }
}

export default TableRow;