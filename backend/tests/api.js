const axios = require('axios');

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000 // 10 segundos
});

module.exports = api;
