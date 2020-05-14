import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

class Success extends Component {
	
	constructor(props) {
		super(props);
		// debugger
		this.state = {
			isLoggedIn: this.props.location.state.user.logged_in,
			user: this.props.location.state.user.user,
			// navigate: false
		}
		this.logout = this.logout.bind(this)
	}

	logout (event) {
		event.preventDefault();

		this.props.history.push('/');
		
		axios.post('http://localhost:3001/logout')
		.then(response => {
			console.log(response.data);
		})
		.catch(error => console.log('api errors:', error))
	}

	render () {
		// console.log(this.state)
		// let { navigate } = this.state;
		
		// if (navigate) {
		// 	return <Redirect to="/" push={true} /> 
		// }
		return (
			<div>
				<p>Good job! You have Signed in.</p>
				<br/>
				<Link to='/login'>Log In</Link>
				<Link to='/logout' onClick={this.logout}>
					Log Out
				</Link>
			</div>
		);
	}
}

export default Success;