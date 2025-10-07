"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import Header from "@/components/Header/Header";
import AddRestaurant from "./components/AddRestaurant";
import AdminDashboard from "../../app/profile/components/dashboard/AdminDashboard";
import { getMe } from "@/utils/api/auth";
import ProfilePage from "./components/ProfilePage";

const Profile = () => {
  const { user, logoutUser } = useAuth();


  return (
    <ProtectedRoute>
      {user && !user.username && <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <h2 className="text-3xl font-bold text-neutral-800">You need to login to view this page</h2>
      </div>}
     {user && !user.isAdmin ? <div className="min-h-screen bg-gray-50">
        <Header />
        <ProfilePage user={user} logoutUser={logoutUser} />
      </div>
      :
      <AdminDashboard/>
      }
    </ProtectedRoute>
  );
};

export default Profile;
