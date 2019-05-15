import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux'

import { loginActions } from "../actions";

const LoginPure = (props) => {
    const [cpf, setCpf] = useState("");

    const handleLogin = e => {
        e.preventDefault();
        props.login(cpf);
    }

    const handleLogout = e => {
        e.preventDefault();
        props.logout();
    }

    const loginBtnClass = props.isLogging ? " disabled" : "";
    const render = props.isLogged ?
    <div align="center">
        You are already logged in.<br/>
        <button type="button" className="btn btn-outline-dark" onClick={handleLogout}>Leave</button>
    </div> :
    <div align="center">
        <input 
            type="text" 
            className="form-control w-25 m-2 cpf" 
            name="cpf" 
            onChange={e => setCpf(e.target.value)}
            placeholder="CPF"/>
        <button type="button" className={"btn btn-outline-primary m-2" + loginBtnClass} onClick={handleLogin}>Enter</button>
    </div>

    return render;
}

export const Login = connect(
    state => state.auth,
    {
        login: loginActions.login,
        logout: loginActions.logout
    }
)(LoginPure)