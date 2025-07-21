"use client";

import { useTheme } from "@/context/themeContext";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const RestaurantCard = ({ restaurant }) => {
  const {theme} = useTheme()
  const { name, cuisine, averageRating, address } = restaurant;
 
  return (
    <div>
      {
        <div
          
          className={`w-72 xl:w-80 2xl:w-96 shadow-lg pt-2 rounded-3xl + ${(theme === "dark" ? " bg-gray-800" : "")}`}
        >
          <div className="m-4 relative mx-auto box-border w-[90%] h-72 rounded-3xl">
            {restaurant.image ? (
              <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover rounded-3xl " />
            ) : (
              <span className="w-full h-full flex justify-center items-center text-4xl bg-gradient-to-br from-pink-700 via-violet-500 to-blue-700 rounded-3xl">
                {!restaurant.name ? "Restaurant" : restaurant.name}
              </span>
            )}
          </div>
          <div className={` flex flex-col text-gray-800 m-4 pb-4 rounded-3xl ${theme === "dark" ? " text-white" : ""}`}>
            <div className={`flex justify-between text-black font-semibold text-2xl ${theme === "dark" ? " text-pink-600" : ""}`}>
              <h2 className="font-bold ">{name}</h2>
              <span className="bg-green-500  rounded-3xl px-3 p-1 flex items-center justify-end">
                {Number(averageRating).toFixed(1)} <Star size={20} className="text-red-700" />{" "}
              </span>
            </div>
            <div className="flex">
              <p className="font-semibold">{cuisine}</p>
            </div>
            <div className="flex">
              <p>{address}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default RestaurantCard;
