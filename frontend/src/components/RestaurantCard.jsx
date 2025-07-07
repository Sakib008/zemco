"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RestaurantCard = ({ restaurant }) => {
  const nextImage = false;
  const { name, cuisine, averageRating, address } = restaurant;
  return (
    <div>
      {
        <div
          
          className="w-96 bg-slate-100 rounded-3xl"
        >
          <div className="m-4 mx-auto w-80 h-72 pt-4 rounded-3xl">
            {nextImage ? (
              <Image src={""} alt="" className="w-full h-full" />
            ) : (
              <span className="w-full h-full flex justify-center items-center text-4xl bg-gradient-to-br from-pink-700 via-violet-500 to-blue-700 rounded-3xl">
                {!restaurant.name ? "Restaurant" : restaurant.name}
              </span>
            )}
          </div>
          <div className=" flex flex-col text-gray-800 m-4 pb-4 rounded-3xl">
            <div className="flex justify-between text-black font-semibold text-2xl">
              <h2 className="font-bold ">{name}</h2>
              <span className="bg-green-500  rounded-3xl px-3 p-1 flex items-center justify-end">
                {averageRating} <Star size={20} className="text-red-700" />{" "}
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
