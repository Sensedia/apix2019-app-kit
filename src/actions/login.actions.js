import { loginService } from "../services";
import { history } from "../history";

export const loginActions = {
    login,
    logout,
    register,
    update,
    doUpdate,
    cancel,
    getUser
}

function getUser() {
    return dispatch => { 
        dispatch({ type: "GET_USER_REQUEST" })
        loginService.getUser()
        .then(user => {
            dispatch({ type: "GET_USER_SUCCESS", payload: user });
        })
        .catch(err => {
            dispatch({ type: "GET_USER_FAIL" });
        })
    }
}

function login(document) {
    return (dispatch) => {
        dispatch({ type: "LOGIN_REQUEST" });
        return loginService.login(document)
        .then((user) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            history.push("/");
        }, err => {
            dispatch({ type: "LOGIN_FAIL", payload: { cpf: document, message: err.message } });
            history.push("/register")
        })
        .catch(err => {
            dispatch({ type: "LOGIN_FAIL", payload: { cpf: document, message: err.message } });            
            history.push("/register")
        });
    }
}

function doUpdate() {
    return dispatch => {
        dispatch({ type: "UPDATE_USER" });
        history.push("/register");
    }
}

function update(user) {
    return dispatch => {
        dispatch({ type: "UPDATE_USER_REQUEST" });
        loginService.register(user)
        .then(res => {
            dispatch({ type: "UPDATE_USER_SUCCESS", payload: user });
            history.push("/");
        }, err => { dispatch({ type: "UPDATE_USER_FAIL", payload: err.message }) })
        .catch(err => {
            dispatch({ type: "UPDATE_USER_FAIL", payload: err.message })
        })
    }
}

function logout() {
    return dispatch => {
        dispatch({ type: "LOGOUT" });
        return loginService.logout();
    }
}
function register(document, name, email, phone, payday) {
    return dispatch => {
        dispatch({ type: "REGISTER_REQUEST" });
        loginService.register({ document, name, email, phone, payday })
        .then(res => {
            dispatch({ type: "REGISTER_SUCCESS", payload: { document, name, email, phone, payday } })
            history.push("/");
        }, err => { dispatch({ type: "REGISTER_FAIL", payload: err.message }) })
        .catch(err => {
            dispatch({ type: "REGISTER_FAIL", payload: err.message });
        })
    }
}

function cancel() {
    return dispatch => {
        dispatch({ type: "REGISTER_CANCEL" });
        history.push("/login");
    }
}