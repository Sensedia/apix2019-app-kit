import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from 'react-router-dom'
import "./index.css";
import { ConnectedApp } from "./App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import { history } from "./history";
import '@fortawesome/fontawesome-free/css/all.min.css';
require('dotenv').config()

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
