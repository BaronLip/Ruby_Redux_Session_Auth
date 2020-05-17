const initialState = {
	username: '',
	email: '',
	password: '',
	errors: ''
	
}

const usersReducer = (state = initialState, action) => {
	console.log(state);
	// return state;
	switch (action.type) {
		case "SIGNUP":
			return {
				user: action.user
			}
	default:
		return state;
	}
}

export default usersReducer;