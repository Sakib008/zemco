const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL : 'http://localhost:3001/api/restaurants',
    headers : {
        "Content-Type" : "application/json"
    }
})

module.exports = axiosInstance;