import Axios from "axios";

// Action constants:
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Action creators:
const loginUser = (user) => {
	return {
		type: LOGIN,
		user: user
	}
}

const logoutUser = (user) => {
	return {
		type: LOGOUT,
		user: user
	}
}

const redirectSuccess = (user, history) => {
	history.push('/success', user);
}

const redirectHome = (user, history) => {
	console.log(user, history);
	history.push("/")
}


export const login = (user, historyProp) => {
	console.log(user, historyProp);
	return function(dispatch) {
		return Axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
		.then((response) => {
			console.log(response, historyProp);
			let user = response.data.user;
			dispatch(loginUser(user));
			if (response.data.logged_in === true) {
				 redirectSuccess(user, historyProp)
			};
		})
		.catch((errors) => {
			console.log("api errors:", errors)
		})
	}
}

export const logout = (user, history) => {
		console.log(user, history);
		return function(dispatch) {
			// Deletes session info from backend.
			return Axios.delete('http://localhost:3001/logout')
			.then(response => {
				// Console.log for confirmation.
				console.log(response.data);
				dispatch(logoutUser())
				// Sends user back to homepage.
				redirectHome(user, history);
			})
			.catch(error => console.log('api errors:', error))
	
		}
}