const initialState = {
	isLoggedIn: false
}

const sessionsReducer = (state = initialState, action) => {
	console.log(state, action);
	switch (action.type) {
		case "LOGIN":
			return {
				isLoggedIn: true,
				user: action.user
			}
		case "LOGOUT" :
			return {
				isLoggedIn: false,
				user: {}
			}
	default: return state;
	}
}

export default sessionsReducer;