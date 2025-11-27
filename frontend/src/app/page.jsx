"use client";
import Header from "@/components/Header/Header";
import RestaurantCard from "@/components/RestaurantCard";
import { useRestaurant } from "@/context/restaurantContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { state, getAllRestaurant } = useRestaurant();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching restaurants...");
        await getAllRestaurant();
        console.log("Restaurants fetched successfully");
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center h-screen w-screen flex justify-center items-center text-2xl font-bold">
        <div className="size-20 rounded-full bg-transparent border-4 border-r-0 border-r-transparent border-purple-800 animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <Header />
      <main className="max-w-screen-2xl p-2 mx-auto text-center min-h-screen ">
        <section className="w-full h-80 mb-5 font-bold text-3xl md:text-4xl lg:text-8xl bg-gradient-to-tr from-purple-500 via-pink-600 to-violet-800 flex justify-center items-center rounded-3xl text-white">
          <h1>Best Restaurants of Year 2025</h1>
        </section>
        <div className="flex justify-end text-right items-center">
          <Link
            href={"/restaurant"}
            className="bg-blue-700 text-white flex text-2xl rounded-2xl p-2 items-center justify-center "
          >
            <ArrowRight />
            View All Restaurants
          </Link>
        </div>

        <section className="flex flex-wrap gap-10 justify-center">
          {!isLoading && state.restaurants && state.restaurants.length > 0 ? (
            state.restaurants
              .sort((a, b) => b.averageRating - a.averageRating)
              .slice(0, 5)
              .map((restaurant) => (
                <Link
                  href={`restaurant/${restaurant._id}`}
                  key={restaurant._id}
                >
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              ))
          ) : (
            <div className="text-center text-xl text-gray-600">
              No restaurants found. Please check the console for debugging
              information.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
