// External imports
import axios from 'axios'

// const browserHistory = createBrowserHistory();

// Action Creator(s)
export const SIGNUP = "SIGNUP"

// const signupUser = (user) => {
// 	console.log(user);
// 	return { type: SIGNUP, user };
// }

// const redirect = (user) => {
// 	history.push('/login', user);
// }

export const signup = (user) => {
	console.log(user);
	return axios.post(
		'http://localhost:3001/users', {user}, {withCredentials: true}
	)
	.then( (response) => {
		console.log(response);
		// debugger;
		if (response.data.status === 'created') {
			let user = response.data.user;
			// window.location = "/login"
			// redirect(user);
			return { 
				type: SIGNUP,
				user: user	
			}
			// ********************
			// browserHistory.push('/login', {user: user})
			// dispatch({
			// 	type: SIGNUP,
			// 	user: response.data 
			// }) 
		}
	})
	.catch(error => console.log('api errors:', error))
}


