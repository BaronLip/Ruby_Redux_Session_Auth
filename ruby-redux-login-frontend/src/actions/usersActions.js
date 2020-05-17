import axios from 'axios'

export const SIGNUP = "SIGNUP"

export const signup = (user) => {
	console.log("Actions for User", user)
	axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
	.then(response => {
	if (response.data.status === 'created') {
		console.log(response.data);
		// this.props.handleLogin(response.data);
		// // Opt1 Prior code.
		// this.redirect();

		// // Opt2 Goes directly to Success after signup.
		// this.props.history.push('/success', {user: user});

		// // Opt3 Goes to login page. Requires login, Then success confirmation.
		this.props.history.push('/login', {user: user});
		return {
			type: SIGNUP,
			user: response.data 
		}
	} else {
		this.setState({
			errors: response.data.errors
		})
	}
	})
	.catch(error => console.log('api errors:', error))
}


