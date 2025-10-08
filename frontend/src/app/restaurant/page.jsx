"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";

import { useRestaurant } from "@/context/restaurantContext";
import Header from "@/components/Header/Header";
import Pagination from "@/components/Pagination";
import RestaurantCard from "@/components/RestaurantCard";
import { useTheme } from "@/context/themeContext";
import FilterItem from "./components/filter";

const Restaurant = () => {
  const { theme } = useTheme();
  const { state, getAllRestaurant } = useRestaurant();
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchRestaurants = async () => {
      try {
        if (state.restaurants.length === 0) {
          await getAllRestaurant();
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurants();
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative bg-gray-50 ${
        theme === "dark" ? "dark:bg-gray-900" : ""
      }`}
    >
      <Header />
      <section className="relative max-w-screen-2xl flex mx-auto">
        <button
          className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-full shadow ${
            theme === "dark"
              ? "bg-gray-800 border-2 border-white text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setShowFilter(true)}
        >
          <Filter />
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
        <main className="  md:min-w-[65vw] ">
          <div className="min-h-[80vh] flex gap-4 justify-center p-6 flex-wrap">
            {restaurantOnPage.map((restaurant) => (
              <Link href={`restaurant/${restaurant._id}`} key={restaurant._id}>
                <RestaurantCard restaurant={restaurant} />
              </Link>
            ))}
          </div>
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
