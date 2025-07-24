import {
  RESTAURANT_ADD,
  RESTAURANT_UPDATE,
  RESTAURANTS_ALL,
  SET_FILTER,
  CLEAR_FILTER,
} from "@/utils/action";

export const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  dish: [],
  user: {},
  token: "",
  filter: {
    cuisines: [],
    dishes: [],
    rating: "",
  },
};

const filterRestaurants = (restaurants, filter) => {
  return restaurants.filter((restaurant) => {
    const cuisineMatch =
      filter.cuisines.length === 0 ||
      filter.cuisines.includes(restaurant.cuisine);
    const dishMatch =
      filter.dishes.length === 0 ||
      restaurant.menu.some((dish) => filter.dishes.includes(dish.name));
    const ratingMatch =
      !filter.rating || restaurant.averageRating >= filter.rating;
    return cuisineMatch && dishMatch && ratingMatch;
  });
};

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case RESTAURANTS_ALL:
      return {
        ...state,
        restaurants: action.payload,
        filteredRestaurants: filterRestaurants(action.payload, state.filter),
      };
    case RESTAURANT_ADD:
      const newRestaurants = [...state.restaurants, action.payload];
      return {
        ...state,
        restaurants: newRestaurants,
      };
    case RESTAURANT_UPDATE:
      const updatedRestaurants = state.restaurants.map((restaurant) =>
        restaurant._id === action.payload._id ? action.payload : restaurant
      );
      return {
        ...state,
        restaurants: updatedRestaurants,
      };
    case SET_FILTER:
      const newFilter = { ...state.filter, ...action.payload };
      return {
        ...state,
        filter: newFilter,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filter: { cuisines: [], dishes: [], rating: null },
      };
    default:
      return state;
  }
};

export default restaurantReducer;
