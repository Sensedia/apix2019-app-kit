import axios from "axios";

const API_URL = process.env.REACT_APP_KITS_API_URL + 'kits';
const PAYMENT_API_URL = process.env.REACT_APP_PAYMENT_API_URL;

export const kitsService = {
    submitKit,
    buyRecommendation,
    getKits
}

/**
 * Essa função é a que invoca o serviço externo, a API de Kits.
 * Use o Axios ou outra biblioteca de requisições HTTP para fazer
 * aqui a requisição. Retorne uma 'Promise' (o resultado das requisições
 * axios são Promises!)
 */
function submitKit(kit) {
    let config = { headers: { 'Content-type': 'application/json'} }    
    return axios.post(API_URL,kit,config)
}

function buyRecommendation(id, payload) {
    let config = { headers: { 'Content-type': 'application/json'} }    
    return axios.post(PAYMENT_API_URL + '/customers/' + id + '/debits', payload, config)
}

function getKits(user) {
    let config = { headers: { 'Content-type': 'application/json'} }    
    return axios.get(API_URL + '?phone=' + user.phone, config)
}