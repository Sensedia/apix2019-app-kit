import React, { useState } from 'react';
import { connect } from 'react-redux'

import { loginActions } from "../actions";

const LoginPure = (props) => {
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");

    const loginBtnClass = props.isLogging ? " disabled" : "";
    const render = props.isLogged ?
    <div align="center">
        Você já está autenticado/a.<br/>
        <button type="button" className="btn btn-outline-dark mr-1" onClick={props.logout}>Sair</button>
        <button type="button" className="btn btn-outline-dark" onClick={props.doUpdate}>Atualizar dados</button>
    </div> :
    <div align="center">
        <input 
            type="text" 
            className="form-control w-25 m-2 cpf" 
            name="cpf" 
            onChange={e => setCpf(e.target.value)}
            placeholder="CPF"/>
        <input 
            type="password" 
            className="form-control w-25 m-2 password" 
            name="password" 
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha"/>
        <button type="button" className={"btn btn-outline-primary m-2" + loginBtnClass} onClick={e => props.login(cpf, password)}>Login</button>
        {props.loginError ? <pre className="text-danger text-center">{props.loginError}</pre> : ""}    
    </div>

    return render;
}

export const Login = connect(
    state => state.auth,
    {
        login: loginActions.login,
        getUser: loginActions.getUser,
        logout: loginActions.logout,
        doUpdate: loginActions.doUpdate
    }
)(LoginPure)