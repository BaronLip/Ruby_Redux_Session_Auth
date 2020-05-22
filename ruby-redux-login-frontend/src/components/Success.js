import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { logout } from '../actions/sessionActions'

class Success extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: this.props.logged_in,
			user: this.props.user,
		}
		// this.props.logout = this.logout.bind(this)
	}

	// logout (event) {
	// 	event.preventDefault();
		
	// 	// Deletes session info from backend.
	// 	axios.delete('http://localhost:3001/logout')
	// 	.then(response => {
	// 		// Console.log for confirmation.
	// 		console.log(response.data);
	// 	})
	// 	.catch(error => console.log('api errors:', error))

	// 	// Sends user back to homepage.
	// 	this.props.history.push('/');
	// }

	render () {
		// console.log(this.state.user)
		return (
			<div>
				<p>Good job! You have Signed in.</p>
				<br/>
				<Link to='/logout' onClick={ ()=> this.props.logout(this.props.user, this.props.history)}>
					Log Out
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		isLoggedIn: state.session.isLoggedIn,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: (user, history) => (dispatch(logout(user, history)))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Success));