const { default: axios } = require("axios");
const localUrl = "http://localhost:3001/api/"
const lambdaUrl = "https://kp4fka6atwn7fstjnshyg3ypiq0wjisi.lambda-url.us-east-1.on.aws/api"
const renderUrl ='https://zemco-backend.onrender.com/api'
const axiosInstance = axios.create({
    baseURL : lambdaUrl,
    headers : {
        "Content-Type" : "application/json"
    }
})

module.exports = axiosInstance;