const initialState = {
	username: '',
	email: '',
	password: '',
	errors: ''
	
}

const usersReducer = (state = initialState, action) => {
	console.log(state);
	return state;
	// switch (action.type) {
	// 	case LOGIN:
	// 		return {
	// 			user: action.user
	// 		}
	// }
}

export default usersReducer;