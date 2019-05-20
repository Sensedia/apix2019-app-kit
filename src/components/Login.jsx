import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import { loginActions } from "../actions";

const LoginPure = (props) => {
    const [cpf, setCpf] = useState("");

    useEffect(() => {
        const f = async () => { await props.getUser(); }
        f();
      }, [])

    const loginBtnClass = props.isLogging ? " disabled" : "";
    const render = props.isLogged ?
    <div align="center">
        You are already logged in.<br/>
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
        <button type="button" className={"btn btn-outline-primary m-2" + loginBtnClass} onClick={e => props.login(cpf)}>Enter</button>
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