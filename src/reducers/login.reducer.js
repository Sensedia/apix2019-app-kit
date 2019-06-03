

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
                cpfError: action.payload.cpf,
                loginError: action.payload.message
            }
        case 'LOGOUT':
            return {
                ...state,
                isLogging: false,
                isLogged: false,
                useUserData: false
            }
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                errorMessage: "",
                registerError: "",
                errorUpdating: "",
                loginError: ""
            }
        case 'GET_USER_REQUEST': {
            return {
                ...state,
                gettingUser: true
            }
        }
        case 'GET_USER_FAIL': {
            return {
                ...state,
                gettingUser: false
            }
        }
        case 'GET_USER_SUCCESS': {
            return {
                ...state,
                gettingUser: false,
                user: action.payload
            }
        }
        case 'REGISTER_REQUEST': {
            return {
                ...state,
                isRegistering: true,
                isLogged: false,
            }
        }
        case 'REGISTER_SUCCESS': {
            return {
                ...state,
                isRegistering: false,
                isLogged: true,
                user: action.payload
            }
        }
        case 'REGISTER_FAIL': {
            return {
                ...state,
                cpfError: null,
                isRegistering: false,
                useUserData: false,
                registerError: action.payload
            }
        }
        case 'REGISTER_CANCEL': {
            return {
                ...state,
                isRegistering: false
            }
        }
        case 'UPDATE_USER': {
            return {
                ...state,
                useUserData: true
            }
        }
        case 'UPDATE_USER_REQUEST': {
            return {
                ...state,
                isUpdating: true,
            }
        }
        case 'UPDATE_USER_SUCCESS': {
            return {
                ...state,
                isUpdating: false,
                user: action.payload,
                useUserData: false
            }
        }
        case 'UPDATE_USER_FAIL': {
            return {
                ...state,
                isUpdating: false,
                errorUpdating: action.payload
            }
        }
        default:
            return state;
    }
}