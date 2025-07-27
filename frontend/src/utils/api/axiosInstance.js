const { default: axios } = require("axios");

const axiosInstance = axios.create({
    baseURL : 'https://zemco-backend.onrender.com/api/restaurants',
    headers : {
        "Content-Type" : "application/json"
    }
})

module.exports = axiosInstance;