const initialState = {
	isLoggedIn: false
}

const sessionsReducer = (state = initialState, action) => {
	console.log(state);
	return state;
	// switch (action.type) {
	// 	case LOGIN:
	// 		return {
	// 			user: action.user
	// 		}
	// }
}

export default sessionsReducer;