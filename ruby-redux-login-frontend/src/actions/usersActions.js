// I really don't understand this reiteration of making Actions.
// ACTIONS:
const SIGNUP = "SIGNUP";
const LOGIN = "LOGIN";

// ACTION CREATORS:
const signUp = () => {
	return {type: SIGNUP};
}

const login = () => {
	return {type: LOGIN};
}