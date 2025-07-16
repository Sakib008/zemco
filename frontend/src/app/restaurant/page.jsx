"use client";

import { useRestaurant } from "@/context/restaurantContext";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import RestaurantCard from "@/components/RestaurantCard";
import Link from "next/link";
import { CLEAR_FILTER, SET_FILTER } from "@/utils/action";

const Restaurant = () => {
  const { state,dispatch, getAllRestaurant } =useRestaurant();
  const cuisineRef = useRef();
  const menuRef = useRef();
  const ratingRef = useRef();

  // Local state for filters
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    getAllRestaurant();
  }, [state.filter]);

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
      if (!existingMenu.price.includes(item.price)) {
        existingMenu.price.push(item.price);
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
    if (!allCuisine.includes(item.cuisine)) {
      allCuisine.push(item.cuisine);
    }
  });
  
  // Rating
  const ratings = [5, 4, 3, 2, 1];

  // Handlers for Rating,Cuisine, and Dishes Filter
  const handleCuisine = (e) => {
    const { value, checked } = e.target;
    let updatedCuisines = checked
      ? [...selectedCuisines, value]
      : selectedCuisines.filter((c) => c !== value);
    setSelectedCuisines(updatedCuisines);
    dispatch({type : SET_FILTER,payload : {cuisines : updatedCuisines}})
  };
  const handleMenu = (e) => {
    const { value, checked } = e.target;
    let updatedDishes = checked
      ? [...selectedDishes, value]
      : selectedDishes.filter((d) => d !== value);
    setSelectedDishes(updatedDishes);
    dispatch({type : SET_FILTER,payload : {dishes : updatedDishes}})
  };
  const handleRating = (e) => {
    const value = Number(e.target.value);
    setSelectedRating(value);
    dispatch({type : SET_FILTER,payload : {rating : value}})
    console.log("Rating handle : ",state.filter)
  };

  // Handler to Clear Filters
  const handleClear = ()=>{
    dispatch({type : CLEAR_FILTER})
    console.log("Clear Filter : ",state)
  }

  // Pagination of the App
  const restaurants = state.filteredRestaurants;
  const restaurantPerPage = 6;
  const [currentPage,setCurrentPage] = useState(1);
  const totalpage = Math.ceil(restaurants.length / restaurantPerPage);
  const restaurantOnPage = restaurants.slice((currentPage-1)*restaurantPerPage,currentPage*restaurantPerPage)
  const onPageChange = (pageNo)=>{
    setCurrentPage(pageNo)
  }

  return (
      <div className="min-h-screen relative bg-gray-50">
        <Header />
        <section className="relative max-w-screen-2xl flex mx-auto">
          <aside className="w-72 sticky top-16 min-w-64 flex shadow-xl py-6 rounded-2xl p-4 items-start justify-start flex-col h-[92vh]">
            <div className="text-2xl font-bold my-2 flex justify-between w-full">
            <h1 className="">Filters</h1>
            <button onClick={handleClear} className="text-lg">Clear</button>
            </div>
            <div className="flex flex-col" ref={cuisineRef}>
              <h1 className="text-xl font-semibold">Cuisines</h1>
              {allCuisine.map((cuisineType, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={`cuisine-${cuisineType}`}
                    id={`cuisine-${cuisineType}`}
                    value={cuisineType}
                    checked={selectedCuisines.includes(cuisineType)}
                    onChange={handleCuisine}
                  />
                  <label htmlFor={`cuisine-${cuisineType}`}>
                    {cuisineType}
                  </label>
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
                      value={dishType.name}
                      checked={selectedDishes.includes(dishType.name)}
                      onChange={handleMenu}
                    />
                    <label className="mx-2" htmlFor={`dish-${dishType.name}`}>
                      {dishType.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div ref={ratingRef}>
              <h1 className="text-xl font-semibold">Rating</h1>
              {ratings.map((rating, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="rating"
                    id={`rating-${rating}`}
                    value={rating}
                    checked={selectedRating === rating}
                    onChange={handleRating}
                  />
                  <label htmlFor={`rating-${rating}`}>{rating}</label>
                </div>
              ))}
            </div>
          </aside>
          <main className=" flex flex-wrap gap-4 mx-auto p-6">
            {restaurantOnPage.map((restaurant) => (
              <Link href={`restaurant/${restaurant._id}`} key={restaurant._id}>
                <RestaurantCard restaurant={restaurant} />
              </Link>
            ))}

            <Pagination currentPage={currentPage} totalPages={totalpage} onPageChange={onPageChange}/>
          </main>
        </section>
      </div>
  );
};

export default Restaurant;
