"use client";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors,setErrors] = useState({});
  const [isLoading,setIsLoading] = useState(false)
  const {loginUser} = useAuth(); 
  const usernameRef = useRef();
  const passwordRef = useRef();
  
  useEffect(()=>{
    usernameRef.current.focus()
  },[])

  const handleFormChange = (e) => {
    const {name,value} = e.target
    setForm((prev) => ({
      ...prev,
      [name]:value,

    }));
    if(errors[name]){
      setErrors(prev=>({
        ...prev,
        [name] : ''
      }))
    }

  };
  const validateForm = ()=>{
    const newError = {};
    if(!form.username.trim()){
    newError.username = "Username is Required"
    }
    if(!form.password){
      newError.password = "Password is Required";
    }else if(!form.password.length > 8){
      newError.password = "Password must be at least 8 character"
    }

    setErrors(newError)
    return Object.keys(newError).length === 0
  }
  const submitForm =async (e)=>{
    e.preventDefault();
    if(!validateForm()){
      if(errors.username){
        usernameRef.current.focus()
      }else if(errors.password){
        passwordRef.current.focus()
      }
      return
    }
    setIsLoading(true)

    try {
      await loginUser(form)
      setForm({username : '',password : ''})
      setErrors({})
    } catch (error) {
      setErrors({ general: "Login failed. Please check your credentials." });
      passwordRef.current?.focus();
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="w-[90vw] md:max-w-screen-xl mx-auto h-[80vh] flex items-center my-20 border-2 rounded-3xl bg-slate-50 border-violet-800 box-border">
      <div className="hidden lg:block w-1/2 h-full rounded-l-3xl relative overflow-hidden">
        <Image
          className=" object-cover"
          fill
          src={
            "https://images.unsplash.com/photo-1488324346298-5ad3d8f96d0d?q=80&w=744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="dining-table"
        />
      </div>
      <div className="h-full w-[90vw] mx-auto md:w-1/2 flex items-center justify-center text-purple-900">
        <form
          onSubmit={submitForm}
          className="flex flex-col shadow-lg shadow-purple-600 bg-white p-8 rounded-3xl text-2xl"
        >
          <div className="flex gap-3 my-3">
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleFormChange}
              className="outline-none bg-transparent border-b-2 border-b-purple-800"
              id="email"
            />
          </div>
          <div className="flex gap-3 my-3">
            <input
              type="text"
              ref={passwordRef}
              placeholder="Enter Password"
              className="outline-none bg-transparent border-b-2 border-b-purple-800"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              id="password"
            />
          </div>
          <div>
            <p className="text-lg mt-5">Don't have an account? <Link href={'/signup'} className="text-gray-800 underline-offset-2 underline">Sign up here</Link></p>
          </div>
          <button type="submit" disabled={isLoading===true} className="p-2 bg-purple-800 rounded-2xl w-1/2 text-white mt-2 mx-auto">{!isLoading ? "Log In": "Submitting"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
