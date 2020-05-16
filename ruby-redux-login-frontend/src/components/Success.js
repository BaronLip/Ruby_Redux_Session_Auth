import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

class Success extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: this.props.location.state.user.logged_in,
			user: this.props.location.state.user.user,
		}
		this.logout = this.logout.bind(this)
	}

	logout (event) {
		event.preventDefault();
		// Sends user back to homepage.
		this.props.history.push('/');

		// Deletes session info from backend.
		axios.delete('http://localhost:3001/logout')
		.then(response => {
			// Console.log for confirmation.
			console.log(response.data);
		})
		.catch(error => console.log('api errors:', error))
	}

	render () {
		console.log(this.state.user)
		return (
			<div>
				<p>Good job! You have Signed in.</p>
				<br/>
				<Link to='/logout' onClick={this.logout}>
					Log Out
				</Link>
			</div>
		);
	}
}

export default Success;