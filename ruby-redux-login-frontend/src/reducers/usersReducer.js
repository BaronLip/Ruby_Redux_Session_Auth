const initialState = {
	username: '',
	email: '',
	password: '',
	errors: ''
	
}

const usersReducer = (state = initialState, action) => {
	console.log(state, action);
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