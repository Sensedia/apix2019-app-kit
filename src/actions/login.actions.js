import { loginService } from "../services";
import { history } from "../history";

export const loginActions = {
    login,
    logout,
    register,
    cancel
}

function login(username, password) {
    return (dispatch) => {
        dispatch({ type: "LOGIN_REQUEST" });
        return loginService.login(username, password)
        .then((user) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: user });
            history.push("/");
        }, err => {
            dispatch({ type: "LOGIN_FAIL", payload: err });
            history.push("/register")
        })
        .catch(err => {
            dispatch({ type: "LOGIN_FAIL", payload: err });
        });
    }
}

function logout() {
    return dispatch => {
        dispatch({ type: "LOGOUT" });
        return loginService.logout();
    }
}
function register(cpf, email, phone) {
    return dispatch => {
        dispatch({ type: "REGISTER_REQUEST" });
        loginService.register({ cpf, email, phone })
    }
}

function cancel() {
    return dispatch => {
        dispatch({ type: "REGISTER_CANCEL" });
        history.push("/login");
    }
}