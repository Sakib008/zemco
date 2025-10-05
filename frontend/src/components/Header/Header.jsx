"use client";

import { HandPlatter, Search } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { useTheme } from "@/context/themeContext";
import SearchRestaurant from "./components/searchRestaurant";

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header
        className={`sticky hidden top-4 z-50 ${
          theme === "dark" ? "bg-black border-white text-white" : "bg-white"
        }  h-20 max-w-screen-2xl md:flex items-center justify-between mx-auto px-5 rounded-full m-3 border-2 border-gray-600 `}
      >
        <Link
          href={"/"}
          className="w-12 h-12 bg-gradient-to-br flex items-center justify-center from-purple-600 via-pink-600 to-violet-800 rounded-3xl"
        >
          <HandPlatter className="text-white  w-8 h-8" />
        </Link>
        <SearchRestaurant />
        <div className="flex items-center gap-4">
          <Link
            href={"/restaurant"}
            className="text-xl underline underline-offset-2"
          >
            All Restaurant
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full  ${
              theme === "dark" ? " bg-gray-200 text-white" : " bg-gray-800"
            } text-black font-semibold`}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          {isAuthenticated ? (
            <Link
              href={"/profile"}
              className="bg-violet-800 w-12 h-12 font-bold text-2xl text-white border-2 border-gray-600 rounded-full flex items-center justify-center"
            >
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="bg-violet-800 px-6 py-2 font-bold text-white border-2 border-gray-600 rounded-full hover:bg-violet-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`fixed bottom-0 z-50 ${
          theme === "dark" ? "bg-gray-800 border-white text-white" : "bg-white"
        }  h-16 w-full md:hidden flex items-center justify-between mx-auto px-5`}
      >
        <Link
          href={"/"}
          className="w-12 h-12 bg-gradient-to-br flex items-center justify-center from-purple-600 via-pink-600 to-violet-800 rounded-3xl"
        >
          <HandPlatter className="text-white w-8 h-8" />
        </Link>
        <SearchRestaurant />
        <Link
          href={"/restaurant"}
          className="bg-violet-800 w-12 h-12 font-bold text-2xl text-white border-2 border-gray-600 rounded-full flex items-center justify-center"
        >
          <HandPlatter className="text-white w-8 h-8" />
        </Link>
        <Link
          href={"/profile"}
          className="bg-violet-800 w-12 h-12 font-bold text-2xl text-white border-2 border-gray-600 rounded-full flex items-center justify-center"
        >
          {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
        </Link>
      </header>
    </>
  );
};

export default Header;
