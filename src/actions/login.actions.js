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

function clearMessage() {
    return dispatch => {
        dispatch({ type: 'CLEAR_MESSAGE' });
    }
}

function getUser() {
    return async dispatch => { 
        await dispatch(clearMessage());
        await dispatch({ type: "GET_USER_REQUEST" })
        let user = localStorage.getItem("user");
        if (user) {
            if (user.id) { // if user id is already present, don't need to call backend again
                dispatch({ type: "GET_USER_SUCCESS", payload: user });
            } else {
                let document = JSON.parse(user).document;
                await loginService.getUser(document)
                .then(res => {
                    dispatch({ type: "GET_USER_SUCCESS", payload: res.data[0] });
                }, err => {
                    dispatch({ type: "GET_USER_FAIL" });
                })
            }
        } else {
            await dispatch({ type: "GET_USER_FAIL" });
        }
    }
}

function login(document, password) {
    return (dispatch) => {
        dispatch(clearMessage());
        dispatch({ type: "LOGIN_REQUEST" });
        return loginService.login(document, password)
        .then((response) => {
            if (response.status === 204) {
                loginService.getUser(document).then(res => {
                    dispatch({ type: "LOGIN_SUCCESS", payload: res.data[0] });
                    localStorage.setItem("user",JSON.stringify(res.data[0]));
                    history.push("/kit-list");
                }, err => {
                    dispatch({ type: "LOGIN_FAIL", payload: { cpf: document, message: err.message }});          
                });
            } else {
                dispatch({ type: "LOGIN_FAIL", payload: { cpf: document, message: response.message } });
            }
        }, err => {
            if (err.response.status === 404) {
                dispatch({ type: "LOGIN_FAIL", payload: { cpf: document, message: 'Usuário não cadastrado' } });
                history.push("/register")
            }
            let errorMessage = processError(err)
            dispatch({ type: "LOGIN_FAIL", payload: { cpf: document, message: errorMessage } });
        })
    }
}

function doUpdate() {
    return async dispatch => {
        await dispatch(getUser());
        await dispatch({ type: "UPDATE_USER" });
        history.push("/register");
    }
}

function update(newUser) {
    return dispatch => {
        dispatch(clearMessage());
        dispatch({ type: "UPDATE_USER_REQUEST" });
        let user = JSON.parse(localStorage.getItem("user"))
        loginService.update(user.id, { ...user, ...newUser, id: null })
        .then(res => {
            loginService.getUser(user.document).then(res => {
                dispatch({ type: "UPDATE_USER_SUCCESS", payload: res.data[0] });
                localStorage.setItem("user",JSON.stringify(res.data[0]));
                history.push("/");
            })
        }, err => { 
            let errorMessage = processError(err);
            dispatch({ type: "UPDATE_USER_FAIL", payload: errorMessage }) 
        })
    }
}

function logout() {
    return dispatch => {
        dispatch(clearMessage());
        dispatch({ type: "LOGOUT" });
        return loginService.logout();
    }
}
function register(document, name, email, phone, password, expirationDay) {
    return dispatch => {
        dispatch(clearMessage());
        dispatch({ type: "REGISTER_REQUEST" });
        loginService.register({ document, name, email, phone, password, expirationDay })
        .then(res => {
            loginService.getUser(document).then(res => {
                dispatch({ type: "REGISTER_SUCCESS", payload: res.data[0] })
                localStorage.setItem("user",JSON.stringify(res.data[0]));
                history.push("/");
            })
        }, err => { 
            let errorMessage = processError(err);
            dispatch({ type: "REGISTER_FAIL", payload: errorMessage }) 
        });
    }
}

function cancel() {
    return dispatch => {
        dispatch(clearMessage());
        dispatch({ type: "REGISTER_CANCEL" });
        history.push("/login");
    }
}

const processError = err => {
    if (err.response && err.response.data) {
        if (err.response.data.length) {
            return err.response.data.reduce((acc,cur) => acc += cur.message + '\n', "");
        } else {
            return err.response.data.message;
        }
    }
    return err.message;
}