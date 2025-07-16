'use client'
import restaurantReducer, { initialState } from "@/reducer/restaurantReducer";
import {
  RESTAURANT_ADD,
  RESTAURANT_SINGLE,
  RESTAURANTS_ALL,
} from "@/utils/action";
import { addRestaurant, allRestaurant, editRestaurant, singleRestaurant } from "@/utils/api";
import { createContext, useContext, useReducer } from "react";

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
      const formData = new FormData();
      formData.append('name', restaurantData.name);
      formData.append('cuisine', restaurantData.cuisine);
      formData.append('address', restaurantData.address);
      if (restaurantData.image && restaurantData.image instanceof File) {
        formData.append('image', restaurantData.image);
      }
      const res = await editRestaurant(restaurantId, formData);
      if (res.status === 200 || res.status === 201) {
        dispatch({ type: RESTAURANT_ADD, payload: res.data.restaurant });
      }
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const createRestaurant = async(restaurantData)=>{
    try {
      const res = await addRestaurant(restaurantData);
      if(res.status===200|| res.status===201){
        console.log("res data : ",res.data)
      } 
    } catch (error) {
      
    }
  }
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