// External imports
import axios from 'axios'

// Action Creator(s)
export const SIGNUP = "SIGNUP"

const signupUser = (user) => {
	return { 
		type: SIGNUP, 
		user: user 
	};
}

const redirect = (user, history) => {
	history.push('/login', user);
}

export const signup = (user, history) => {
	console.log(user, history);
	return function (dispatch) {
		return axios.post(
			'http://localhost:3001/users', {user}, {withCredentials: true}
		)
		.then( (response) => {
			console.log(response);
			if (response.data.status === 'created') {
				let user = response.data.user;

				redirect({user: user}, history);

				dispatch(signupUser(user))
			}
		})
		.catch(error => console.log('api errors:', error))
	}
}
