// Imports
import React, { Component } from 'react';
import firebase from '../firebase.config';
import DropdownList from './DropdownList';
import TransactionRow from './transactionrow.component';
import TotalRow from './totalrow.component';



export default class Transactions extends Component {

	constructor(props) {
		super(props);
		
		//define initial state
		this.state = {
			transactions: [],
			selected:'',
			total_units_owned:'',
			total_paid_aud:''
		};
	}
	
	
	// load transaction data if component did mount
	componentDidMount() {
	  this._loadTransactionsData();
	}
	
	// re-load transaction data if selected (crytocurrency) state is updated
	componentDidUpdate(prevProps, prevState) {
	  if (this.state.selected !== prevState.selected) {
		this._loadTransactionsData(this.state.selected);
	  }
	}
	
	//set isMounted = false if component unmount
	componentWillUnmount() {
		this._isMounted = false;
	}
	
	//update selected state when user select different cryptocurrency type
	update(value){
	   this.setState({
		 selected: value
	   });
	}
	
	//call TransactionRow component and render once for EACH record -- 1 row for 1 record
	tabRow(){
		return this.state.transactions.map(function(object, i){
		  return <TransactionRow obj={object} key={i} />;
		});
	}

	//call TotalRow component and render total units own and total purchase price
	totalRow(){
		return <TotalRow total_units_owned={this.state.total_units_owned} total_paid_aud={this.state.total_paid_aud} />;
    }
	
	
	//load data based on selected cryptocurrency type	
	_loadTransactionsData(selected) {

		this._isMounted = true;
		const dbRef = firebase.database().ref('transactions'); //database reference 
		var query_filterByType; //query 

		//update query based on selected cryptocurrency type
		switch(selected) { 
			case 'Bitcoin': { 
				query_filterByType = dbRef.orderByChild('cryptocurrency_type').equalTo('Bitcoin');
				break; 
			}

			case 'Ethereum': { 
				query_filterByType = dbRef.orderByChild('cryptocurrency_type').equalTo('Ethereum');
				break; 
			}

			case 'EOS': { 
				query_filterByType = dbRef.orderByChild('cryptocurrency_type').equalTo('EOS');
				break; 
			}
			case 'Litecoin': { 
				query_filterByType = dbRef.orderByChild('cryptocurrency_type').equalTo('Litecoin');
				break; 
			}

			case 'All':
			default: { 
				query_filterByType = dbRef;
				break;              
			} 
		}	 
	
		//fetch data from database based on query
		query_filterByType.on('value', (snapshot) => {
			let transaction = snapshot.val();
			console.log(snapshot.val());
			let newState = [];
			let index = 1;
			let units_owned = 0;
			let total_paid_aud = 0;

			//store data that fetch from database
			for (let item in transaction) {
				newState.push({
				id: item,
				index:index,
				cryptocurrency_type: transaction[item].cryptocurrency_type,
				purchase_unit: transaction[item].purchase_unit,
				purchase_price_aud: transaction[item].purchase_price_aud
				});

				units_owned+=parseFloat(transaction[item].purchase_unit);
				total_paid_aud+=parseFloat(transaction[item].purchase_price_aud);
				index++;
			}	
			
			//update state with new data
			if(this._isMounted){
				this.setState({
				transactions: newState,
				total_units_owned:units_owned.toFixed(8),
				total_paid_aud:total_paid_aud.toFixed(2)
				});			
			}

		});	
	}
	

    render() {
      return (
        <div>
          <h3 align="center">Transactions</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>#</th>
				<th><DropdownList data={this.update.bind(this)}/></th>
                <th>Unit</th>
                <th>Price (AUD)</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
			  { this.totalRow() }
            </tbody>
          </table>
        </div>
      );
    }
	
}