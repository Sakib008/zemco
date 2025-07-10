"use client"

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const { login, signUp } = require("@/utils/api");
const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = Cookies.get('token');
        const storedUser = Cookies.get('user');
        
        if (storedToken) {
            try {
                setToken(storedToken);
            } catch (error) {
                setToken(storedToken);
            }
        }
        
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                setUser(storedUser);
            }
        }
        
        setIsLoading(false);
    }, []);

    const loginUser = async (userData)=>{
        try {
            const {username,password} = userData
            if(!username || !password){
                throw new Error("All fiels are required")
            }
            const res = await login({username, password});
            const {data : {user, token}, status} = res;
            if(status === 200 || status === 201){
                localStorage.setItem("user",  JSON.stringify(user))
                Cookies.set("token", token, {path : '/'})
                setToken(token);
                setUser(user);
                router.push('/');
            }
        } catch (error) {
            throw error
        }
    }
    const signupUser = async (userData)=>{
        try {
            const res = await signUp(userData);
            const {data : {user, token}, status} = res;
            console.log("Response  : ",res)
            if(status === 200 || status === 201){
               localStorage.setItem("user", JSON.stringify(user))
                Cookies.set('token', token, {path : '/'})
                setToken(token);
                setUser(user);
                router.push('/');
            }
        } catch (error) {
            throw error
        }
    }

    const logoutUser = () => {
        Cookies.remove('token', {path : '/'});
        localStorage.removeItem('user');
        setToken('');
        setUser({});
        router.push('/login');
    }

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{
            token,
            user,
            isLoading,
            isAuthenticated,
            loginUser,
            signupUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = ()=> useContext(AuthContext)