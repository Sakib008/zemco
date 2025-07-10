"use client";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({ 
    firstname : '',
    lastname : '',
    username: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    isAdmin : false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signupUser } = useAuth();
  const usernameRef = useRef();
  
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleFormChange = (e) => {
    const { name, value,type,checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type==="checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.firstname.trim()) {
      newErrors.firstname = "Firstname is required";
    }
    if (!form.lastname.trim()) {
      newErrors.lastname = "Lastname is required";
    }
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const {firstname,lastname,username,email,password,isAdmin} = form;
      await signupUser({
        firstname,lastname,username,email,password,isAdmin
      });
      setForm({firstname : '',lastname : '', username: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
    } catch (error) {
      console.error(error)
      const basicMsg =  error?.response?.data?.error || "Signup failed. Please try again.";
      setErrors({general : basicMsg});
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-screen-xl mx-auto h-[80vh] flex items-center my-20 border-2 rounded-3xl bg-slate-50 border-violet-800 box-border">
      <div className="w-1/2 h-full rounded-l-3xl relative overflow-hidden">
        <Image
          className=" object-cover"
          width={800}
          height={500}
          src={
            "https://images.unsplash.com/photo-1488324346298-5ad3d8f96d0d?q=80&w=744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="dining-table"
        />
      </div>
      <div className="h-full relative w-1/2 flex items-center justify-center text-purple-900">
        
        <form
          onSubmit={submitForm}
          className="flex flex-col shadow-lg shadow-purple-600 bg-white p-8 rounded-3xl text-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
          
          {errors.general && (
            <div className="text-red-600 text-lg mb-4 text-center">
              {errors.general}
            </div>
          )}
          
          <div className="flex gap-3 my-3">
            <input
              type="text"
              name="firstname"
              placeholder="Enter Firstname"
              value={form.firstname}
              onChange={handleFormChange}
              className={`outline-none bg-transparent border-b-2 ${
                errors.email ? 'border-red-500' : 'border-b-purple-800'
              }`}
            />
          </div>
          {errors.firstname && (
            <span className="text-red-600 text-sm">{errors.firstname}</span>
          )}
          
          <div className="flex gap-3 my-3">
            <input
              type="text"
              name="lastname"
              placeholder="Enter Lastname"
              value={form.lastname}
              onChange={handleFormChange}
              className={`outline-none bg-transparent border-b-2 ${
                errors.lastname ? 'border-red-500' : 'border-b-purple-800'
              }`}
            />
          </div>
          {errors.lastname && (
            <span className="text-red-600 text-sm">{errors.lastname}</span>
          )}

          <div className="flex gap-3 my-3">
            <input
              ref={usernameRef}
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleFormChange}
              className={`outline-none bg-transparent border-b-2 ${
                errors.username ? 'border-red-500' : 'border-b-purple-800'
              }`}
            />
          </div>
          {errors.username && (
            <span className="text-red-600 text-sm">{errors.username}</span>
          )}

          <div className="flex gap-3 my-3">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleFormChange}
              className={`outline-none bg-transparent border-b-2 ${
                errors.email ? 'border-red-500' : 'border-b-purple-800'
              }`}
            />
          </div>
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email}</span>
          )}

          <div className="flex gap-3 my-3">
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              className={`outline-none bg-transparent border-b-2 ${
                errors.password ? 'border-red-500' : 'border-b-purple-800'
              }`}
            />
          </div>
          {errors.password && (
            <span className="text-red-600 text-sm">{errors.password}</span>
          )}

          <div className="flex gap-3 my-3">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleFormChange}
              className={`outline-none bg-transparent border-b-2 ${
                errors.confirmPassword ? 'border-red-500' : 'border-b-purple-800'
              }`}
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm">{errors.confirmPassword}</span>
          )}

          <div className="flex items-center mt-5">
            <input type="checkbox" className="size-5 mx-2 ring-purple-800" checked={form.isAdmin || false} onChange={handleFormChange} name="isAdmin" id="admin"/>
            <label htmlFor="admin" className="text-lg">
              would you join as Seller ?
            </label>
          </div>
          <div>
            <p className="text-lg ">
              Already have an account?
              <Link
                href={"/login"}
                className="text-gray-800 underline-offset-2 underline"
              >
                Login here
              </Link>
            </p>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="p-2 bg-purple-800 rounded-2xl w-1/2 text-white mt-2 mx-auto hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
