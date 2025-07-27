const {default : axios} = require("axios")

const API_BASE_URL = 'https://zemco-backend.onrender.com/api/auth';

const login = async (userData)=>{
    try {
        return await axios.post(`${API_BASE_URL}/login`,userData,{
            withCredentials : true
        })
    } catch (error) {
        throw error
    }
}
const signUp = async (userData)=>{
    try {
        return await axios.post(`${API_BASE_URL}/register`,userData,{
            withCredentials : true
        })
    } catch (error) {
      
        throw error
    }
}
const logout = async()=>{
    try{
        return await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true })
    }catch(error){
        throw error
    }
}

const getMe = async () => {
    try {
        return await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
    } catch (error) {
        throw error;
    }
}

export { login, signUp, logout, getMe };