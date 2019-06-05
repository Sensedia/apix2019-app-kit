import React from "react";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";
import { ProgressBar } from "./components/ProgressBar";
import { Register } from "./components/Register";
import { KitSelect } from "./components/KitSelect";
import { KitList } from "./components/KitList";

function Index() {
  return <div align="center"><h2 className="text-center">Introdução</h2>
  <p style={{maxWidth: 500}}>Este app serve para mostrar como se faz uma integração entre APIs.</p></div>;
}

function NotFound() {
  return <Redirect to="/" />
}

const App = props => {
  return (
    <div className="container">
      <ProgressBar  />
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Introdução
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/kit-select">
            Selecionar
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/kit-list">
            Listagem de Kits
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>

      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/login/" component={Login} />
        <Route path="/register/" component={Register} />
        <PrivateRoute
          path="/kit-select/"
          isLogged={props.isLogged}
          component={KitSelect}
        />

        <PrivateRoute
          path="/kit-list/"
          isLogged={props.isLogged}
          component={KitList}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

// Connect app
export const ConnectedApp = connect(
  state => state.auth,
  undefined
)(App);
