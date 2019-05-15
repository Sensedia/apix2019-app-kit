import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";
import { ProgressBar } from "./components/ProgressBar";
import { Register } from "./components/Register";
import { KitSelect } from "./components/KitSelect";

function Index() {
  return <h2 className="text-center">Home</h2>;
}

const App = props => {
  return (
    <div className="container">
      <ProgressBar  />
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/kit-select">
            Kits
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>

      <Route path="/" exact component={Index} />
      <Route path="/login/" component={Login} />
      <Route path="/register/" component={Register} />
      <PrivateRoute
        path="/kit-select/"
        isLogged={props.isLogged}
        component={KitSelect}
      />
    </div>
  );
};

// Connect app
export const ConnectedApp = connect(
  state => state.auth,
  undefined
)(App);
