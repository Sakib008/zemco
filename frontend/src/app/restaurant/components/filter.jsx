import { useRestaurant } from "@/context/restaurantContext";
import { CLEAR_FILTER, SET_FILTER } from "@/utils/action";
import React, { useEffect, useState } from "react";

const FilterItem = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const {state,dispatch,getAllRestaurant} = useRestaurant();
  const products = state.restaurants;
  useEffect(() => {
    getAllRestaurant(); 
  }, [selectedCuisines, selectedDishes, selectedRating]);


  // Menu Items Merged
  const allMenu = products.reduce(
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
  products.forEach((item) => {
    if (!allCuisine.includes(item.cuisine)) {
      allCuisine.push(item.cuisine);
    }
  });

  // Rating
  const ratings = [5, 4, 3, 2, 1];

  // Handlers for Rating, Cuisine, and Dishes Filter
  const handleCuisine = (e) => {
    const { value, checked } = e.target;
    let updatedCuisines = checked
      ? [...selectedCuisines, value]
      : selectedCuisines.filter((c) => c !== value);
    setSelectedCuisines(updatedCuisines);
    dispatch({ type: SET_FILTER, payload: { cuisines: updatedCuisines } });
  };
  const handleMenu = (e) => {
    const { value, checked } = e.target;
    let updatedDishes = checked
      ? [...selectedDishes, value]
      : selectedDishes.filter((d) => d !== value);
    setSelectedDishes(updatedDishes);
    dispatch({ type: SET_FILTER, payload: { dishes: updatedDishes } });
  };
  const handleRating = (e) => {
    const value = Number(e.target.value);
    console.log("Selected Rating:", e);
    setSelectedRating(value);
    dispatch({ type: SET_FILTER, payload: { rating: value } });
  };

  // Handler to Clear Filters
  const handleClear = () => {
    setSelectedCuisines([]);
    setSelectedDishes([]);
    setSelectedRating(null);
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <div className={`w-56 sticky top-16 flex shadow-xl py-6 rounded-2xl p-4 items-start justify-start flex-col h-[92vh]`}>
      <div className="text-2xl font-bold my-2 flex justify-between w-full">
        <h1 className="">Filters</h1>
        <button onClick={handleClear} className="text-lg underline underline-offset-2">
          Clear
        </button>
      </div>
      <div className="flex flex-col" >
        <h1 className="text-xl font-semibold">Cuisines</h1>
        {allCuisine.map((cuisineType, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name={`cuisine-${cuisineType}`}
              id={`cuisine-${cuisineType}`}
              value={cuisineType}
              checked={selectedCuisines.includes(cuisineType) || state.filter.cuisines.includes(cuisineType)}
              onChange={handleCuisine}
            />
            <label className="mx-2" htmlFor={`cuisine-${cuisineType}`}>
              {cuisineType}
            </label>
          </div>
        ))}
      </div>
      <div className="my-3">
        <h1 className="text-xl font-bold">Dishes</h1>
        <div className="h-64 overflow-y-scroll ">
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
      <div >
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
            <label className="mx-2" htmlFor={`rating-${rating}`}>
              {rating}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterItem;
