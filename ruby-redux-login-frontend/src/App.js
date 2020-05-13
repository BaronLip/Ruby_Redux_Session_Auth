import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
		isLoggedIn: false,
		user: {}
		};
	}


	handleLogin = (data) => {
		this.setState({
			isLoggedIn: true,
			user: data.user
		})
	}

	handleLogout = () => {
		this.setState({
			isLoggedIn: false,
			user: {}
		})
	}

	loginStatus = () => {
		axios.get('http://localhost:3001/logged_in', 
	   	{withCredentials: true})
		.then(response => {
			console.log(response);
			if (response.data.logged_in) {
				this.handleLogin(response)
			} else {
				this.handleLogout()
			}
		})
		.catch(error => console.log('api errors:', error))
	}

	render() {
		return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
				</Switch>
			</BrowserRouter>
		</div>
		);
	}
}

export default App;
