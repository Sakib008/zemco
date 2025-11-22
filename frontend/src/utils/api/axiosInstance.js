const { default: axios } = require("axios");
const localUrl = "http://localhost:3001/api/"
const renderUrl ='https://zemco-backend.onrender.com/api'
const axiosInstance = axios.create({
    baseURL : localUrl,
    headers : {
        "Content-Type" : "application/json"
    }
})

module.exports = axiosInstance;