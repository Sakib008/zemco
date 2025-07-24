import { useRestaurant } from "@/context/restaurantContext";
import { useTheme } from "@/context/themeContext";
import { Cross, Search, Star, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const SearchRestaurant = () => {
  const searchRef = useRef();
  const { theme } = useTheme();
  const { state } = useRestaurant();
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchRef.current.focus();
    setIsSearching(true);
  };
  // focus on input when clicked search icon
  // div open to show restaurants as user types
 
  const handleInputChange = (e) => {
    handleSearch;
    setSearchValue(e.target.value);
    console.log("Input changed:", e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = state.restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        restaurant.menu.some((dish) =>
          dish.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    });
    console.log("Search results:", results);
    setSearchResults(results);
  };
  const handleCloseSearch = () => {
    setIsSearching(false);
    setSearchValue("");
    searchRef.current.value = "";
  };
  return (
    <div className="relative">
      <div
        className={`flex items-center p-2 px-3 rounded-full w-96 border-2 border-gray-600  ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <input
          ref={searchRef}
          onClick={handleSearch}
          onChange={handleInputChange}
          name="search"
          className="outline-none text-xl w-full bg-transparent px-2"
          type="text"
        />
        {!isSearching ? (
          <label
            id="search "
            className="cursor-pointer bg-transparent"
            onClick={handleSearch}
          >
            <Search />
          </label>
        ) : (
          <label
            id="search "
            className="cursor-pointer bg-transparent"
            onClick={handleCloseSearch}
          >
            <X />
          </label>
        )}
      </div>
      {isSearching && (
        <div
          className={`absolute top-10 mt-3 w-96 min-h-32 max-h-[50vh] overflow-y-auto border-2 border-gray-600 rounded-lg shadow-lg z-10 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          {searchResults.length > 0 ? (
            <ul className="p-2">
              {searchResults.map((restaurant) => (
                <Link
                  href={`/restaurant/${restaurant._id}`}
                  key={restaurant._id}
                >
                  <li
                    key={restaurant._id}
                    className={`py-2 px-4 hover:bg-gray-200 transition-colors ${
                      theme === "dark" ? "hover:bg-gray-700 text-black" : ""}`}
                  >
                    <h3 className="font-semibold">{restaurant.name}</h3>
                    <div className="flex justify-between text-sm">

                    <p className="text-sm text-gray-500">
                      {restaurant.cuisine}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                      <Star size={15} fill="yellow"/> {restaurant.averageRating}
                    </p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRestaurant;
