"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleFormChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="max-w-screen-xl mx-auto h-[80vh] flex items-center my-20 border-2 rounded-3xl border-violet-800 box-border">
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
      <div className="h-full w-1/2 flex items-center justify-center text-purple-900">
        <form
          action=""
          className="flex flex-col border-2 border-purple-700 bg-purple-200 p-8 rounded-2xl text-2xl"
        >
          <div className="flex gap-3 my-3">
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleFormChange}
              className="outline-none bg-transparent border-b-2 border-b-purple-800"
              id="email"
            />
          </div>
          <div className="flex gap-3 my-3">
            <input
              type="text"
              placeholder="Enter Password"
              className="outline-none bg-transparent border-b-2 border-b-purple-800"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              id="password"
            />
          </div>
          <div className="flex gap-3 my-3">
            <input
              type="text"
              placeholder="Enter Password"
              className="outline-none bg-transparent border-b-2 border-b-purple-800"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              id="password"
            />
          </div>
          <div className="flex gap-3 my-3">
            <input
              type="text"
              placeholder="Enter Password"
              className="outline-none bg-transparent border-b-2 border-b-purple-800"
              name="password"
              value={form.password}
              onChange={handleFormChange}
              id="password"
            />
          </div>
          <div>
            <p className="text-lg mt-5">
              Already have an account?{" "}
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
            className="p-2 bg-purple-800 rounded-2xl w-1/2 text-white mt-2 mx-auto"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
