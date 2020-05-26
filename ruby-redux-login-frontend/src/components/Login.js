// External imports:
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

// Local imports:
import { login } from "../actions/sessionActions";

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.state = { 
		username: '',
		email: '',
		password: '',
		errors: ''
		};
	}
	
	// Previously use componentWillMount() which is now depreciated.
	// In order to not immediately redirect after signup, comment this out. 
	// componentDidMount() {
	// 	return this.props.loggedInStatus ? this.redirect() : null
	// }
	
	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
		[name]: value
		})
	};
	
	handleSubmit = (event) => {
		event.preventDefault();
		const {username, email, password} = this.state;
	
		let userInfo = {
		username: username,
		email: email,
		password: password
		};
		
		this.props.login(userInfo, this.props.history);

		// axios.post('http://localhost:3001/login', {userInfo}, {withCredentials: true})
		// .then(response => {
		// 	if (response.data.logged_in) {
		// 		this.props.handleLogin(response.data);
		// 		// // Prior code.
		// 		// this.redirect();
		// 		this.props.history.push('/success', {user: response.data})
		// 	} else {
		// 		this.setState({
		// 		errors: response.data.errors
		// 		})
		// 	}
		// })
		// .catch(error => console.log('api errors:', error))
	};

	// Prior code tied to componentWillMount()/ componentDidMount().
	// redirect = () => {
	// 	this.props.history.push('/success')
	// }
	
	handleErrors = () => {
		return (
		<div>
			<ul>
				{this.state.errors.map(error => {
					return <li key={error}>{error}</li>
					})
				}
			</ul>
		</div>
		)
	}
	
	render() {
		const {username, email, password} = this.state;
		return (
		<div>
			<h1>Log In</h1>
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
				<button placeholder="submit" type="submit">
					Log In
				</button>
				<br/>
				<div>
					or <Link to='/signup'>sign up</Link>
				</div>
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
		session: state.session,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (userInfo, historyProp) => (dispatch(login(userInfo, historyProp))),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));