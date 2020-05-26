// External imports:
import React, { Component } from 'react';
import Axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Internal imports:
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Success from "./components/Success";
import store from './app/store';
// import 

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
		isLoggedIn: false,
		user: {}
		};
	}
	
	componentDidMount() {
		this.loginStatus();
	}
	
	loginStatus = () => {
		Axios.get('http://localhost:3001/logged_in', {withCredentials: true})
		.then(response => {
			console.log(response, store.getState());
			// if (response.data.logged_in) {
			// 	this.handleLogin(response)
			// } else {
			// 	this.handleLogout()
			// }
		})
		.catch(error => console.log('api errors:', error))
	}
	
	// Migrating to sessionReducer as case statement.
	// handleLogin = (data) => {
	// 	this.setState({
	// 	isLoggedIn: true,
	// 	user: data.user
	// 	});
	// }
	
	// Migrating to sessionReducer as case statement.
	// handleLogout = () => {
	// 	this.setState({
	// 	isLoggedIn: false,
	// 	user: {}
	// 	});
	// }
	
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route 
							exact path='/' 
							render={props => (
							<Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
							)}
						/>
						<Route 
							exact path='/login' 
							render={props => (
							<Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
							)}
						/>
						<Route 
							exact path='/signup' 
							render={props => (
							<Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
							)}
						/>
						<Route 
							exact path='/success'
							render={ props => (
								<Success {...props} handleLogout={this.handleLogout} />
							)}
						/>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;