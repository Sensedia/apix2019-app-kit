import axios from "axios";

const API_URL = "http://localhost:8000/clients"

export const loginService = {
  login,
  logout,
  register,
  update,
  getUser
};

function getUser() {
  return new Promise((resolve, reject) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      resolve(user);
    } else {
      reject();
    }
  })
}

let users;
axios
  .get("./users.json")
  .then(res => {
    users = res.data;
  })
  .catch(err => {
    if (!users) {
      users = {};
    }
  });

function login(document) {
  
  try {
    if (!document || document.length < 1) {
      return new Promise((resolve, reject) => { reject(new Error("Need to provide CPF.")) });
    }

    return axios.get(API_URL + "/" + document)
    .then(res => res.json())
  } catch(err) {
    return new Promise((resolve, reject) => { reject(err); });
  }
}

function logout() {
  return new Promise(resolve => {
    localStorage.removeItem("user");
    resolve();
  });
}

function register(user) {
  try {
    return axios.post(API_URL, user, {
      headers: {
        'Content-type': 'application/json'
      }
    });
  } catch(err) {
    console.log(err)
    return new Promise((resolve,reject) => { reject(err); });
  }
}

function update(user) {
  try {
    return axios.put(API_URL, user, {
      headers: {
        'Content-type': 'application/json'
      }
    });
  } catch(err) {
    return new Promise((resolve,reject) => { reject(err); });
  }
}