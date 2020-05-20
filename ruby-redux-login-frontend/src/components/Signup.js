import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
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
		console.log(this.state);
		let userInfo = {
			username: username,
			email: email,
			password: password,
			password_confirmation: password_confirmation
		};
		console.log("Signup User", userInfo);

		this.props.signup(userInfo);
		
		// axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
		// .then(response => {
		// if (response.data.status === 'created') {
		// 	console.log(response.data);
		// 	this.props.handleLogin(response.data);
		// 	// // Opt1 Prior code.
		// 	// this.redirect();

		// 	// // Opt2 Goes directly to Success after signup.
		// 	// this.props.history.push('/success', {user: user});

		// 	// // Opt3 Goes to login page. Requires login, Then success confirmation.
		// 	this.props.history.push('/login', {user: user}); // `{user: user}` is not necessary but is used to test code.
		// } else {
		// 	this.setState({
		// 		errors: response.data.errors
		// 	})
		// }
		// })
		// .catch(error => console.log('api errors:', error))
	};
	
	// // Opt1 Prior code.
	// redirect = () => {
	// 	this.props.history.push('/')
	// }
	
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		// session: state["session"]
		session: state.session,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		signup: (userInfo) => dispatch(signup(userInfo))
	}
}

// Use the connect() in conjunction with mapStateToProps & mapDispatchToProps to connect the Redux Store to a React component.
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
// export default Signup;
