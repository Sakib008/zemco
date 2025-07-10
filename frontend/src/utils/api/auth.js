const {default : axios} = require("axios")

const API_BASE_URL = 'http://localhost:3001/api/auth';

const login = async (userData)=>{
    try {
        return await axios.post(`${API_BASE_URL}/login`,userData)
    } catch (error) {
        throw error
    }
}
const signUp = async (userData)=>{
    try {
        return await axios.post(`${API_BASE_URL}/register`,userData)
    } catch (error) {
      
        throw error
    }
}

export {login,signUp}