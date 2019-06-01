import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { loginActions } from "../actions";

const PAYDAYS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

const RegisterPure = props => {

  const [cpf, setCpf] = useState(props.auth.cpfError ? props.auth.cpfError : 
    props.auth.useUserData ? props.auth.user.document : "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(props.auth.useUserData ? props.auth.user.email : "");
  const [phone, setPhone] = useState(props.auth.useUserData ? props.auth.user.phone : "");
  const [name, setName] = useState(props.auth.useUserData ? props.auth.user.name : "");
  const [payday, setPayday] = useState(props.auth.useUserData ? props.auth.user.payday : 1);

  const handleSubmit = e => {
    e.preventDefault();
    props.register(cpf, name, email, phone, password, payday);
  }

  const handleUpdate = e => {
    e.preventDefault();
    props.update({cpf, name, email, phone, password, payday});  
  }

  const handleCancel = e => {
    e.preventDefault();
    props.cancel();
  }

  if (props.auth.isLogged && !props.auth.useUserData) {
    return <Redirect to="/login"/>
  }


  return (
    <div align="center" className="form-group">
      <input
        type="text"
        className={"form-control w-25 m-2 cpf"}
        style={{minWidth: 200}}
        placeholder="CPF (só números)"
        onChange={e => setCpf(e.target.value)}
        value={cpf}
      />
      <input
        type="text"
        className="form-control w-25 m-2 name"
        style={{minWidth: 200}}
        placeholder="Nome"
        onChange={e => setName(e.target.value)}
        required
        value={name}
      />
      <input
        type="text"
        className="form-control w-25 m-2 email"
        style={{minWidth: 200}}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
        value={email}
      />
      <input
        type="text"
        className="form-control w-25 m-2 phone"
        style={{minWidth: 200}}
        placeholder="Telefone (+5511999999999)"
        onChange={e => setPhone(e.target.value)}
        required
        value={phone}
      />
      <input
        type="password"
        className="form-control w-25 m-2 password"
        style={{minWidth: 200}}
        placeholder="Senha"
        onChange={e => setPassword(e.target.value)}
        required
      />
      <div className="d-flex justify-content-center">Dia do pagamento:<Dropdown>
        <Dropdown.Toggle size="sm" className="ml-2" variant="primary" id="dropdown-payday">
          {payday}
        </Dropdown.Toggle>

        <Dropdown.Menu className="overflow-auto" style={{height: 200}}>
          {PAYDAYS.map((day, i) => <Dropdown.Item key={i} onClick={() => {
              setPayday(day)
            }}>{day}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown>
      </div>
      <button 
        type="button" 
        className="btn btn-outline-primary m-2"
        onClick={props.auth.useUserData ? handleUpdate : handleSubmit}
        >{props.auth.useUserData ? "Atualizar" : "Cadastrar"}</button>
      <button
        type="button"
        className="btn btn-outline-primary m-2"
        onClick={handleCancel}
        >Cancel</button>
      {props.auth.errorUpdating ? <pre className="text-danger text-center">{props.auth.errorUpdating}</pre> : ""}
      {props.auth.loginError ? <pre className="text-danger text-center">{props.auth.loginError}</pre> : ""}
      {props.auth.registerError ? <pre className="text-danger text-center">{props.auth.registerError}</pre> : ""}
    </div>
  );
};

export const Register = connect(
  state => state,
  { 
    register: loginActions.register,
    cancel: loginActions.cancel,
    update: loginActions.update
  }
)(RegisterPure);
