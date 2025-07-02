import {
  RESTAURANT_ADD,
  RESTAURANT_DELETE,
  RESTAURANT_SINGLE,
  RESTAURANT_UPDATE,
  RESTAURANTS_ALL,
} from "@/utils/action";

export const initialState = {
  restaurants: [],
  dish: [],
};

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case RESTAURANTS_ALL:
      return { ...state, restaurants: action.payload };
    case RESTAURANT_ADD:
      return { ...state, restaurants: [...state.restaurants, action.payload] };
    case RESTAURANT_UPDATE:
      return {
        ...state,
        restaurants: state.restaurants.map((restaurant) => {
          restaurant._id !== action.payload._id ? action.payload : restaurant;
        }),
      };
  }

};

export default restaurantReducer;
