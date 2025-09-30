"use client";

import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
import Header from "@/components/Header/Header";
import AddRestaurant from "./components/AddRestaurant";
import AdminDashboard from "../../app/profile/components/dashboard/AdminDashboard";
import { getMe } from "@/utils/api/auth";

const Profile = () => {
  const { user, logoutUser } = useAuth();
  const [openRestaurant, setOpenRestaurant] = useState(false);

  return (
    <ProtectedRoute>
     {!user.isAdmin ? <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex w-full mx-auto justify-center">
              <div className="mx-10">
                <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
                  Profile
                </h1>
                <div className="flex items-center justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-violet-800 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                </div>
              </div>
              {user?.isAdmin && (
                <div className="sticky top-5 right-10 flex justify-center flex-col items-center">
                    <button
                      onClick={() => setOpenRestaurant(true)}
                      className="bg-purple-700 text-white px-6 py-2 rounded-2xl font-semibold mb-4"
                    >
                      Add Restaurant
                    </button>
                    <AddRestaurant
                      open={openRestaurant}
                      setOpen={setOpenRestaurant}
                    />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Username:</span>
                  <span className="text-purple-800">
                    {user?.username || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="text-purple-800">
                    {user?.email || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">
                    Account Type:
                  </span>
                  <span className="text-purple-800">
                    {user?.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={logoutUser}
                  className="bg-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      :
      <AdminDashboard/>
      }
    </ProtectedRoute>
  );
};

export default Profile;
