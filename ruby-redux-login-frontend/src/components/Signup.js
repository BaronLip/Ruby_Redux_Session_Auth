// External imports:
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
// Local imports:
import { signup } from '../actions/usersActions'

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			username: '',
			email: '',
			password: '',
			password_confirmation: '',
			errors: ''
		};
	}
	
	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	};
	
	handleSubmit = (event) => {
		event.preventDefault();
		const {username, email, password, password_confirmation} = this.state;

		let userInfo = {
			username: username,
			email: email,
			password: password,
			password_confirmation: password_confirmation
		};
		console.log("Signup User", userInfo);
		this.props.signup(userInfo, this.props.history);
	};
	
	handleErrors = () => {
		return (
		<div>
			<ul>{this.state.errors.map( (error) => {
				return <li key={error}>{error}</li>
			})}
			</ul>
			<Link to='/login'>Log In</Link>
		</div>
		)
	}
	
	render() {
		const {username, email, password, password_confirmation} = this.state;
		// console.log(this.props);
		// console.log(this.state);
		return (
			<div>
				<h1>Sign Up</h1>
				<form onSubmit={this.handleSubmit}>
					<input
						placeholder="username"
						type="text"
						name="username"
						value={username}
						onChange={this.handleChange}
					/>
					<br/>
					<input
						placeholder="email"
						type="text"
						name="email"
						value={email}
						onChange={this.handleChange}
					/>
					<br/>
					<input 
						placeholder="password"
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
					/>
					<br/>
					<input
						placeholder="password confirmation"
						type="password"
						name="password_confirmation"
						value={password_confirmation}
						onChange={this.handleChange}
					/>
					<br/>
					<button placeholder="submit" type="submit">
						Sign Up
					</button>
				</form>

				<div>
				{ this.state.errors ? this.handleErrors() : null }
				{/* { console.log("Signup has rendered.") } */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		session: state.session,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		signup: (userInfo, history) => dispatch(signup(userInfo, history))
	}
}

// Use the connect() in conjunction with mapStateToProps & mapDispatchToProps to connect the Redux Store to a React component.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup))
// export default Signup;
