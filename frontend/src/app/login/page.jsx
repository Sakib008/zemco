"use client";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <div className="max-w-screen-xl mx-auto h-[80vh] flex items-center my-20 border-2 rounded-3xl border-violet-800">
      <div className="w-1/2"> <Image fill={true} src={'https://unsplash.com/photos/dining-table-with-drinking-high-glass-and-fork-tKpA64QrccM?w=800'} alt="dining-table" className="w-full"/> </div>
      <div>
        <form action=""></form>
      </div>
    </div>
  );
};

export default Login;
