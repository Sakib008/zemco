"use client"

import { login, signUp, logout, getMe } from "@/utils/api/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const loginUser = async (userData) => {
        try {
            const res = await login(userData);
            if (res.status === 200 || res.status === 201) {
                // After login, fetch user info
                const meRes = await getMe();
                setUser(meRes.data.user);
                localStorage.setItem("user", JSON.stringify(meRes.data.user));
                router.push("/");
            }
        } catch (error) {
            throw error;
        }
    };

    const signupUser = async (userData) => {
        try {
            const res = await signUp(userData);
            if (res.status === 200 || res.status === 201) {
                // After signup, fetch user info
                const meRes = await getMe();
                setUser(meRes.data.user);
                localStorage.setItem("user", JSON.stringify(meRes.data.user));
                router.push("/");
            }
        } catch (error) {
            throw error;
        }
    };

    const logoutUser = async () => {
        try {
            await logout();
        } catch (error) {
            
        } finally {
            setUser(null);
            localStorage.removeItem("user");
            router.push("/login");
        }
    };

    const isAuthenticated = !!user;
    const role = user && user.isAdmin ? "admin" : "user";

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                isLoading,
                isAuthenticated,
                loginUser,
                signupUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);