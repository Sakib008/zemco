"use client";

import { useRestaurant } from "@/context/restaurantContext";
import React, { useEffect, useRef } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import Link from "next/link";

const Restaurant = () => {
  const { state, getAllRestaurant } = useRestaurant();
  const cuisineRef = useRef();
  const menuRef = useRef();
  const ratingRef = useRef();

  useEffect(() => {
    getAllRestaurant();
  }, []);
  console.log("All Restaurant : ", state.restaurants);
  let restaurant = state.restaurants;
  // Menu Items Merged
  const allMenu = state.restaurants.reduce(
    (acc, currentRestaurant) => acc.concat(currentRestaurant.menu),
    []
  );
  const mergedMenu = [];
  allMenu.forEach((item) => {
    const existingMenu = mergedMenu.find(
      (menuItem) => menuItem.name === item.name
    );
    if (existingMenu) {
      if (existingMenu.price !== item.price) {
        existingMenu.price.push(item.push);
      }
    } else {
      mergedMenu.push({
        name: item.name,
        price: [item.price],
        isVeg: item.isVeg,
      });
    }
  });

  // Cuisine Items
  const allCuisine = [];
  state.restaurants.forEach((item) => {
    const existingCusine = allCuisine.find(
      (restaurant) => restaurant.cuisine === item.cuisine
    );
    if (!existingCusine) {
      allCuisine.push(item.cuisine);
    }
  });
  const handleCuisine = (e) => {
    restaurant.filter((item) => {});
  };
  const handleMenu = (e) => {};
  // Rating function
  const ratings = [1, 2, 3, 4, 5];
  const handleRating = (e) => {};

  return (
    <ProtectedRoute>
      <div className="min-h-screen relative bg-gray-50">
        <Header />
        <section className="relative">
          <aside className="w-72 flex p-5 shadow-lg items-start justify-start flex-col h-[90vh]  absolute top-4 left-4">
            <h1 className="text-2xl font-bold my-2">Filters</h1>
            <div className="flex flex-col" ref={cuisineRef}>
              <h1 className="text-xl font-semibold">Cuisines</h1>
              {allCuisine.map((cuisineType, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={`cuisine-${cuisineType}`}
                    id={`cuisine-${cuisineType}`}
                  />
                  <label htmlFor={`cuisine-${cuisineType}`}>{cuisineType}</label>
                </div>
              ))}
            </div>
            <div ref={menuRef} className="my-3">
              <h1 className="text-xl font-bold">Dishes</h1>
              <div className="h-64 overflow-y-scroll">
                {mergedMenu.map((dishType, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={`dish-${dishType.name}`}
                      id={`dish-${dishType.name}`}
                    />
                    <label className="mx-2" htmlFor={`dish-${dishType.name}`}>{dishType.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div ref={ratingRef}>
              <h1 className="text-xl font-semibold">Rating</h1>
              {ratings.reverse().map((rating,index) => (
                <div key={index}>
                  <input type="radio" name="rating" id={`rating-${rating}`} />
                  <label htmlFor="rating">{rating}</label>
                </div>
              ))}
            </div>
          </aside>
          <main className="max-w-screen-xl flex flex-wrap gap-5 mx-auto p-6">
            {state.restaurants.map((restaurant) => (
              <Link href={`restaurant/${restaurant._id}`} key={restaurant._id}>
                <RestaurantCard restaurant={restaurant} />
              </Link>
            ))}
          </main>
        </section>
      </div>
    </ProtectedRoute>
  );
};

export default Restaurant;
