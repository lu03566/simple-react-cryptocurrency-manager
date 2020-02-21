//Imports
import React, { Component } from 'react';
import { validateCurrencyType, validatePurchaseUnit, validatePurchasePrice } from './validators'
import firebase from '../firebase.config';

export default class Add extends Component {
	
	constructor(props) {
		super(props);
		
		//binding functions
		this.onChangeCryptocurrencyType = this.onChangeCryptocurrencyType.bind(this);
		this.onChangePurchaseUnit = this.onChangePurchaseUnit.bind(this);
		this.onChangePurchasePrice = this.onChangePurchasePrice.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		//define initial state
		this.state = {
			cryptocurrency_type: 'Bitcoin',
			purchase_unit: '',
			purchase_price_aud:'',
			purchaseUnitErr: {
				status: false,
				value: ''
			},
			purchasePriceErr: {
				status: false,
				value: ''
			}

		}
	}	
  
	//functions that read user inputs and update state
	onChangeCryptocurrencyType(e) {
		this.setState({
			cryptocurrency_type: e.target.value
		})  
	}

	onChangePurchaseUnit(e) {
		this.setState({
			purchase_unit: e.target.value
		})  
	}
	
	onChangePurchasePrice(e) {
		this.setState({
			purchase_price_aud: e.target.value
		})
	}
  

	// form validation
	checkFormStatus() {
		const purchaseUnitErr = validatePurchaseUnit(this.state.purchase_unit)
		const purchasePriceErr = validatePurchasePrice(this.state.purchase_price_aud)

		//return true if no error || return false and update error message
		if (!purchaseUnitErr.status && !purchasePriceErr.status) {
		return true
		} else {
			this.setState({
				purchaseUnitErr,
				purchasePriceErr
			})
		return false
		}
	}

	onSubmit(e) {
		e.preventDefault(); //prevent page from refresh

		// submit form and push into database if no error
		if(this.checkFormStatus()) {
			console.log("form status"+this.checkFormStatus);
			const dbRef = firebase.database().ref('transactions');
			const transaction = {
			  cryptocurrency_type: this.state.cryptocurrency_type,
			  purchase_unit: parseFloat(this.state.purchase_unit).toFixed(8),
			  purchase_price_aud: parseFloat(this.state.purchase_price_aud).toFixed(2)	  
			};
			dbRef.push(transaction);

			console.log(`The values are ${this.state.cryptocurrency_type}, ${this.state.purchase_unit}, and ${this.state.purchase_price_aud}`)

			//clear inputs on page
			this.setState({
			  cryptocurrency_type: '',
			  purchase_unit: '',
			  purchase_price_aud: ''
			})
		}
	}
 
  render() {
      return (
          <div style={{ marginTop: 10 }}>
          <h3 align="center">New Transaction</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                  </div>
				  
				  <div className="form-group">
					<label>Crytocurrency Type: </label>
					<select className="form-control" id="exampleFormControlSelect1" value={this.state.cryptocurrency_type} onChange={this.onChangeCryptocurrencyType}>
					  <option>Bitcoin</option>
					  <option>Ethereum</option>
					  <option>EOS</option>
					  <option>Litecoin</option>
					</select>
				  </div>
				  
                  <div className="form-group">
                      <label>Purchase Unit: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.purchase_unit}
                        onChange={this.onChangePurchaseUnit}
                        />
						<p style={{color:'red'}}>{ this.state.purchaseUnitErr.value }</p>

                  </div>
                  <div className="form-group">
                      <label>Purchase Price (AUD) : </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.purchase_price_aud}
                        onChange={this.onChangePurchasePrice}
                        />
						<p style={{color:'red'}}>{ this.state.purchasePriceErr.value }</p>

                  </div>
                  <div className="form-group">
                      <input type="submit" value="Record Transaction" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }
}