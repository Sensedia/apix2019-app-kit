import React, { useState } from "react";
import { connect } from "react-redux";
import { loginActions } from "../actions";

const RegisterPure = props => {
  const [cpf, setCpf] = useState(props.auth.cpfError ? props.auth.cpfError : "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  const handleSubmit = e => {
    e.preventDefault();
    props.register(cpf, email, phone);
  }

  const handleCancel = e => {
    e.preventDefault();
    props.cancel();
  }

  return (
    <div align="center" className="form-group">
      <input
        type="text"
        className={"form-control w-25 m-2 cpf"}
        placeholder="CPF (only numbers)"
        onChange={e => setCpf(e.target.value)}
        value={cpf}
      />
      <input
        type="text"
        className="form-control w-25 m-2 email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        className="form-control w-25 m-2 phone"
        placeholder="Phone (+5511999999999)"
        onChange={e => setPhone(e.target.value)}
        required
      />
      <button 
        type="button" 
        className="btn btn-outline-primary m-2"
        onClick={handleSubmit}
        >Register</button>
      <button
        type="button"
        className="btn btn-outline-primary m-2"
        onClick={handleCancel}
        >Cancel</button>
    </div>
  );
};

export const Register = connect(
  state => state,
  { 
    register: loginActions.register,
    cancel: loginActions.cancel
  }
)(RegisterPure);
