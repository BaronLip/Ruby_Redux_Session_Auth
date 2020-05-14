import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

let user;

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
		user = {
			username: username,
			email: email,
			password: password,
			password_confirmation: password_confirmation
		}
		console.log(user);
		
		axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
		.then(response => {
		if (response.data.status === 'created') {
			console.log(response.data);
			this.props.handleLogin(response.data);
			// // Prior code.
			// this.redirect();
			this.props.history.push('/login', {user: user})
		} else {
			this.setState({
			errors: response.data.errors
			})
		}
		})
		.catch(error => console.log('api errors:', error))
	};
	
	// // Prior code.
	// redirect = () => {
	// 	this.props.history.push('/success')
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

export default Signup;