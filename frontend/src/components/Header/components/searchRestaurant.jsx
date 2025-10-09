"use client";
import { useRestaurant } from "@/context/restaurantContext";
import { useTheme } from "@/context/themeContext";
import { Search, Star, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const SearchRestaurant = () => {
  const desktopSearchRef = useRef();
  const mobileSearchRef = useRef();
  const { theme } = useTheme();
  const { state } = useRestaurant();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    setIsSearching(true);
    // Focus the appropriate input based on screen size
    setTimeout(() => {
      if (window.innerWidth >= 768) {
        desktopSearchRef.current?.focus();
      } else {
        mobileSearchRef.current?.focus();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    
    // Automatically show search results when user starts typing
    if (!isSearching) {
      setIsSearching(true);
    }

    if (value.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = state.restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(value.toLowerCase()) ||
        restaurant.menu.some((dish) =>
          dish.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
    setSearchResults(results);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    setSearchValue("");
    setSearchResults([]);
  };

  return (
    <div className="relative">
      {/* Desktop Search bar */}
      <div
        className={`hidden md:flex items-center p-2 px-3 rounded-full w-96 border-2 border-gray-600  ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <input
          ref={desktopSearchRef}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setIsSearching(true)}
          name="search"
          placeholder="Search restaurants or dishes..."
          className="outline-none text-xl w-full bg-transparent px-2"
          type="text"
        />
        {!isSearching ? (
          <button
            className="cursor-pointer bg-transparent"
            onClick={handleSearch}
          >
            <Search />
          </button>
        ) : (
          <button
            className="cursor-pointer bg-transparent"
            onClick={handleCloseSearch}
          >
            <X />
          </button>
        )}
      </div>

      {/* Desktop Search Results */}
      {isSearching && (
        <div
          className={`hidden md:block absolute top-14 w-96 min-h-32 max-h-[50vh] overflow-y-auto border-2 border-gray-600 rounded-lg shadow-lg z-50 ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-neutral-100 text-black"
          }`}
        >
          {searchValue && searchResults.length > 0 ? (
            <ul className="p-2">
              {searchResults.map((restaurant) => (
                <Link
                  href={`/restaurant/${restaurant._id}`}
                  key={restaurant._id}
                  onClick={handleCloseSearch}
                >
                  <li
                    className={`py-2 px-4 rounded cursor-pointer transition-colors ${
                      theme === "dark" 
                        ? "hover:bg-gray-700" 
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500">
                        {restaurant.cuisine}
                      </p>
                      <p className="flex items-center gap-1 text-gray-500">
                        <Star size={15} fill="yellow" stroke="orange" />
                        {Number(restaurant.averageRating).toFixed(1)}
                      </p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : searchValue ? (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchValue}"
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Start typing to search restaurants...
            </div>
          )}
        </div>
      )}

      {/* Mobile Search bar */}
      <div className="md:hidden p-2 rounded-full flex items-center justify-center px-3">
        <button
          onClick={handleSearch}
          className="absolute right-3"
          aria-label="Search"
        >
          <Search />
        </button>

        {isSearching && (
          <div className="fixed top-2 z-50 left-4 right-4 mx-auto">
            <div className="flex items-center relative">
              <input
                ref={mobileSearchRef}
                value={searchValue}
                onChange={handleInputChange}
                name="search"
                placeholder="Search..."
                className={`rounded-2xl border-2 border-neutral-800 outline-none text-lg w-full py-2 px-4 pr-10 ${
                  theme === "dark" 
                    ? "bg-gray-800 text-white" 
                    : "bg-neutral-100 text-black"
                }`}
                type="text"
              />
              <button
                onClick={handleCloseSearch}
                className="absolute right-3"
                aria-label="Close search"
              >
                <X />
              </button>
            </div>

            {/* Mobile Search Results */}
            {(searchValue || searchResults.length > 0) && (
              <div
                className={`mt-2 min-h-32 max-h-[60vh] overflow-y-auto border-2 border-gray-600 rounded-lg shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-black"
                }`}
              >
                {searchResults.length > 0 ? (
                  <ul className="p-2">
                    {searchResults.map((restaurant) => (
                      <Link
                        href={`/restaurant/${restaurant._id}`}
                        key={restaurant._id}
                        onClick={handleCloseSearch}
                      >
                        <li
                          className={`py-2 px-4 rounded transition-colors ${
                            theme === "dark"
                              ? "hover:bg-gray-700"
                              : "hover:bg-gray-200"
                          }`}
                        >
                          <h3 className="font-semibold">{restaurant.name}</h3>
                          <div className="flex justify-between text-sm">
                            <p className="text-gray-500">
                              {restaurant.cuisine}
                            </p>
                            <p className="flex items-center gap-1 text-gray-500">
                              <Star size={15} fill="yellow" stroke="orange" />
                              {Number(restaurant.averageRating).toFixed(1)}
                            </p>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchValue ? `No results found for "${searchValue}"` : "Start typing to search..."}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRestaurant;