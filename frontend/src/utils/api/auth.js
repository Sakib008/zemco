const axios = require('./axiosInstance');

const login = async (userData)=>{
    try {
        return await axios.post(`/auth/login`,userData,{
            withCredentials : true
        })
    } catch (error) {
        throw error
    }
}
const signUp = async (userData)=>{
    try {
        return await axios.post(`/auth/register`,userData,{
            withCredentials : true
        })
    } catch (error) {
      
        throw error
    }
}
const logout = async()=>{
    try{
        return await axios.get(`/auth/logout`, { withCredentials: true })
    }catch(error){
        throw error
    }
}

const getMe = async () => {
    try {
        return await axios.get(`/auth/me`, { withCredentials: true });
    } catch (error) {
        throw error;
    }
}

export { login, signUp, logout, getMe };