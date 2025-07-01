'use client'
import restaurantReducer, { initialState } from "@/reducer/restaurantReducer";
import {
  RESTAURANT_ADD,
  RESTAURANT_SINGLE,
  RESTAURANTS_ALL,
} from "@/utils/action";
import { allRestaurant, editRestaurant, singleRestaurant } from "@/utils/api";
import { data } from "autoprefixer";
import { createContext, useContext, useEffect, useReducer } from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  const getAllRestaurant = async () => {
    try {
      const {data : {restaurants}, status } = await allRestaurant();
      if (status === 200 || status === 201) {
        dispatch({ type: RESTAURANTS_ALL, payload: restaurants });
      }
    } catch (error) {
      console.error(error.message)
      throw error;
    }
  };

  const getSingleRestaurant = async (restaurantId) => {
    try {
      const { data :{Restaurant}, status } = await singleRestaurant(restaurantId);
     
      if (status === 200 || status === 201) {
        dispatch({ type: RESTAURANT_ADD, payload: Restaurant });
      }else{
        console.log('This is already Exist')
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const updateRestaurant = async (restaurantId, restaurantData) => {
    try {
      const { restaurant, status } = await editRestaurant(
        restaurantId,
        restaurantData
      );
      if (status === 200 || status === 201) {
        dispatch({ type: RESTAURANT_ADD, payload: restaurant });
      }
    } catch (error) {}
  };
useEffect(()=>{
    getAllRestaurant();
},[])
  return (
    <RestaurantContext.Provider
      value={{
        state,
        dispatch,
        getAllRestaurant,
        getSingleRestaurant,
        updateRestaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = ()=> useContext(RestaurantContext)