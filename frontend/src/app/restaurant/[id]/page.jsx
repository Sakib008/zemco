"use client";
import RestaurantCard from "@/components/RestaurantCard";
import { useRestaurant } from "@/context/restaurantContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const { state, getSingleRestaurant } = useRestaurant();
  const [loading, setLoading] = useState(false);
  const foundRestaurant = state.restaurants.find(
    (restaurant) => restaurant._id === id
  );
  useEffect(() => {
    const fetchRestaurant = async () => {
      // Only fetch if the restaurant is not already in global state
      if (!foundRestaurant && id && !loading) {
        try {
          setLoading(true);
          await getSingleRestaurant(id);
        } catch (err) {
          console.error("Error fetching restaurant:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRestaurant();
  }, [id, foundRestaurant, loading]);
  if (loading || !foundRestaurant) {
    return <div className="p-4 text-center text-gray-500">Loading post...</div>;
  }
  return (
    <div className="flex justify-center items-center">
      <RestaurantCard restaurant={foundRestaurant} />
    </div>
  );
};

export default page;
