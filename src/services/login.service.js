import axios from "axios";

export const loginService = {
  login,
  logout,
  register,
  getUser
};

function getUser() {
  return new Promise((resolve, reject) => {
    let user = localStorage.getItem("user");
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

function login(cpf) {
  // Escreva aqui o código de login
  // Essa função precisa retornar uma Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cpf.length < 1) {
        reject("Need to provide CPF.");
      } else if (!users[cpf]) {
        reject(cpf);
      } else {
        localStorage.setItem("user", JSON.stringify(users[cpf]));
        resolve(users[cpf]);
      }
    }, 1000);
  });
}

function logout() {
  return new Promise(resolve => {
    localStorage.removeItem("user");
    resolve();
  });
}

function register(user) {
  /**
   * Use Axios ou Node-fetch para enviar a requisição de cadastro
   * para a API de Pagamentos, retorne a Promise da requisição
   */
}
