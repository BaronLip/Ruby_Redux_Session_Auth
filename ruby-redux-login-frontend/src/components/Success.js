import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Success extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			user: this.props.location.state
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