//Imports
import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Add from './Add';
import Edit from './Edit';
import Transactions from './Transactions';

//Create navigation bar and setup routing 
class Routing extends PureComponent {  
	
  render() {
    return (
		<Router>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
					  <ul className="navbar-nav mr-auto">
					  
						<li className="nav-item">
							<Link to={'/'} className="nav-link">Home</Link>
						</li>
						
						<li className="nav-item">
						  <Link to={'/transactions'} className="nav-link">Transactions</Link>
						</li>
						
						
						<li className="nav-item">
						  <Link to={'/add'} className="nav-link">Add</Link>
						</li>
						
					  </ul>
					</div>
				</nav>
			
				<h2>Cryptocurrency Manager</h2>
				
				<Switch>
					<Route exact path='/add' component={ Add } />
					<Route path='/edit/:id' component={ Edit } />
					<Route path='/transactions' component={ Transactions } />
					<Route exact path='/' component= { Home }/>

				</Switch>
			</div>
		</Router>
    );
  }
}

export default Routing;
