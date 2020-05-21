// External imports
import axios from 'axios'

// Action Creator(s)
export const SIGNUP = "SIGNUP"

// const signupUser = (user) => {
// 	console.log(user);
// 	return { type: SIGNUP, user };
// }

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

				dispatch({ 
					type: SIGNUP,
					user: user	
				})
			}
		})
		.catch(error => console.log('api errors:', error))
	}
}


// export const signup = (user, history) => async dispatch => {
// 	const response = await axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
// 	dispatch({ type: SIGNUP, payload: user });
//   };