"use client";

import { useRestaurant } from "@/context/restaurantContext";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import RestaurantCard from "@/components/RestaurantCard";
import Link from "next/link";
import { useTheme } from "@/context/themeContext";
import FilterItem from "./components/filter";
import { Filter } from "lucide-react";


const Restaurant = () => {
  const { theme } = useTheme();
  const { state, getAllRestaurant } = useRestaurant();
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    getAllRestaurant();
  }, [state.filter]);

  // Pagination of the App
  const restaurants = state.filteredRestaurants;
  const restaurantPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalpage = Math.ceil(restaurants.length / restaurantPerPage);
  const restaurantOnPage = restaurants.slice(
    (currentPage - 1) * restaurantPerPage,
    currentPage * restaurantPerPage
  );
  const onPageChange = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <div
      className={`min-h-screen relative bg-gray-50 ${
        theme === "dark" ? "dark:bg-gray-900" : ""
      }`}
    >
      <Header />
      <section className="relative max-w-screen-2xl flex mx-auto">
        <button
  className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow"
  onClick={() => setShowFilter(true)}
>
  <Filter/>
</button>

        <aside className="hidden md:block">
          <FilterItem />
        </aside>
        {showFilter && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-md mx-auto relative">
              <button
                className="absolute top-2 right-2 text-2xl"
                onClick={() => setShowFilter(false)}
              >
                &times;
              </button>
              <FilterItem />
            </div>
          </div>
        )}
        <main className=" flex flex-wrap gap-4 mx-auto p-6">
          {restaurantOnPage.map((restaurant) => (
            <Link href={`restaurant/${restaurant._id}`} key={restaurant._id}>
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalpage}
            onPageChange={onPageChange}
          />
        </main>
      </section>
    </div>
  );
};

export default Restaurant;
