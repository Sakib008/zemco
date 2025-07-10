"use client";

import { useRestaurant } from '@/context/restaurantContext';
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/Header';

const Restaurant = () => {
  const {state} = useRestaurant();
  console.log("All restaurant on page : ", state)
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
              Restaurant Filter Page
            </h1>
            <p className="text-center text-gray-600">
              This page is protected and only accessible to authenticated users.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Restaurant;