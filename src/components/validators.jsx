//validation
export function validatePurchaseUnit(purchase_unit) {
	
	//error if nothing was typed
	if (!purchase_unit.length) {
		return {
			status: true,
			value: 'Purchase Unit is required'
		}
	} 
	
	//error if it's not numeric and if unit is smaller or equal to 0
	else if (isNaN(purchase_unit) || purchase_unit <= 0) {
		return {
			status: true,
			value: 'Invalid input'
		}
	}
	
	//no error
	return {
		status: false,
		value: ''
	}
}

export function validatePurchasePrice(purchase_price) {
	
	//error if nothing was typed
	if (!purchase_price.length) {
		return {
		status: true,
		value: 'Purchase Price is required'
		}
	}

	//error if it's not numeric and if unit is smaller or equal to 0
	else if (isNaN(purchase_price) || purchase_price <= 0) {
		return {
		status: true,
		value: 'Invalid input'
		}
	}

	//no error
	return {
	status: false,
	value: ''
	}
}

