import axios from "axios";

const API_URL = process.env.REACT_APP_PAYMENT_API_URL;

export const loginService = {
  login,
  logout,
  register,
  update,
  getUser
};

function getUser(document) {
  return axios.get(API_URL + '/customers?document=' + document);
}

function login(document, password) {
  let url = API_URL + '/auth';
  let data = JSON.stringify({ document, password });
  let config = { headers: { 'Content-type': 'application/json'} }
  return axios.post(url, data, config);
}

function logout() {
  return new Promise(resolve => {
    localStorage.removeItem("user");
    resolve();
  });
}

function register(user) {
  let config = { headers: { 'Content-type': 'application/json'} }
  return axios.post(API_URL + '/customers', user, config);
}

function update(userId, newUser) {
  let config = { headers: { 'Content-type': 'application/json'} }
  return axios.put(API_URL + '/customers/' + userId, newUser, config);
}