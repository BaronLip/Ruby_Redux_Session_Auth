import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Success extends Component {
	
	constructor(props) {
		super(props);
		// debugger
		this.state = {
			isLoggedIn: this.props.location.state.user.logged_in,
			user: this.props.location.state.user.user
		}
	}


	render () {
		console.log(this.state)
		return (
			<div>
				<p>Good job! You have Signed in.</p>
				<br/>
				<Link to='/login'>Log In</Link>
				<Link to='/logout'>Log Out</Link>
			</div>
		);
	}
}

export default Success;