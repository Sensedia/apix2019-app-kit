

// If user is already logged-in, set initial state
let user = JSON.parse(localStorage.getItem("user"))
const initialState = user ? { isLogged: true } : {};

export function auth(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isLogging: true,
                isLogged: false,
                errorMessage: ""
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLogging: false,
                isLogged: true,
                user: action.payload,
                username: "",
                password: ""
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                isLogging: false,
                isLogged: false,
                cpfError: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                isLogging: false,
                isLogged: false
            }
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                errorMessage: ""
            }
        default:
            return state;
    }
}