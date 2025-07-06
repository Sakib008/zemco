"use client";
import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import { useRestaurant } from "@/context/restaurantContext";

export default function Home() {
  const { state } = useRestaurant();
  console.log("Restaurants List : ", state.restaurants);

  return (
    <>
      <Header />
      <main className="max-w-screen-2xl mx-auto text-center border-2 min-h-screen border-purple-800">
        <section className="w-full h-80 mb-5 font-bold text-8xl bg-gradient-to-tr from-purple-500 via-pink-600 to-violet-800 flex justify-center items-center rounded-3xl text-white">
          <h1>Best Restaurants of Year 2025</h1>
        </section>
        <section className="flex flex-wrap gap-10 justify-center">
          {state.restaurants.length === 0 ? (
            <p className="text-8xl text-center m-10 font-bold">Loading...</p>
          ) : (
            state.restaurants.map((restaurant) => (
              <div key={restaurant._id}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}
