import axios from "axios";

export const kitsService = {
    submitKit
}

/**
 * Essa função é a que invoca o serviço externo, a API de Kits.
 * Use o Axios ou outra biblioteca de requisições HTTP para fazer
 * aqui a requisição. Retorne uma 'Promise' (o resultado das requisições
 * axios são Promises!)
 */
function submitKit(kit) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(kit);
        }, 3000);
    })
}