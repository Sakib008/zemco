'use client'
import restaurantReducer, { initialState } from "@/reducer/restaurantReducer";
import {
  RESTAURANT_ADD,
  RESTAURANTS_ALL,
} from "@/utils/action";
import { addMenuToRestaurant, addRestaurant, allRestaurant, deleteMenuItem, editMenuItem, editRestaurant, removeRestaurant, singleRestaurant } from "@/utils/api";
import { createContext, useContext, useReducer, useState } from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);
  const getAllRestaurant = async () => {
    try {
      console.log("Calling allRestaurant API...");
      const response = await allRestaurant();
      console.log("Full API Response:", response);
      
      // Handle different possible response structures
      let restaurants = [];
      if (response.data && response.data.restaurants) {
        restaurants = response.data.restaurants;
      } else if (response.data && Array.isArray(response.data)) {
        restaurants = response.data;
      } else if (Array.isArray(response.data)) {
        restaurants = response.data;
      }
      
      console.log("Extracted restaurants:", restaurants);
      console.log("Restaurants count:", restaurants.length);
      
      if (response.status === 200 || response.status === 201) {
        console.log("Dispatching RESTAURANTS_ALL with payload:", restaurants);
        dispatch({ type: RESTAURANTS_ALL, payload: restaurants });
      }
    } catch (error) {
      console.error("Error in getAllRestaurant:", error.message)
      throw error;
    }
  };

  const updateRestaurant = async (restaurantId, restaurantData) => {
    try {
      const res = await editRestaurant(restaurantId, restaurantData);
      if (res.status === 200 || res.status === 201) {
        dispatch({ type: RESTAURANT_ADD, payload: res.data.restaurant });
      }
      return res;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const createRestaurant = async(restaurantData)=>{
    try {
     
      const {data : {restaurant},status} = await addRestaurant(restaurantData);
      if(status===200|| status===201){
        dispatch({type : RESTAURANT_ADD,payload : restaurant})
      } 
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const deleteRestaurant = async (restaurantId) => {
    try {
      const res = await removeRestaurant(restaurantId, { isDeleted: true });
      if (res.status === 200 || res.status === 201) {
        dispatch({ type: RESTAURANT_ADD, payload: res.data.restaurant });
      }
      return res;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const createMenu = async (restaurantId, menuData) => {
    try {
      const res = await addMenuToRestaurant(restaurantId, menuData);
      if (res.status === 200 || res.status === 201) {
        const updatedRestaurant = res.data.restaurant;
        dispatch({ type: RESTAURANT_ADD, payload: updatedRestaurant });
      }
      return res;
    } catch (error) {
      console.error(error.message);
      throw error;
    } 
  }
  const editMenu = async (restaurantId, menuId, menuData) => {
    try {
      const res = await editMenuItem(restaurantId, menuId, menuData);
      if (res.status === 200 || res.status === 201) {
        const updatedRestaurant = res.data.restaurant;
        dispatch({ type: RESTAURANT_ADD, payload: updatedRestaurant });
      }
      return res;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  const deleteMenu = async (restaurantId, menuId) => {
    try {
      const res = await deleteMenuItem(restaurantId, menuId);
      if (res.status === 200 || res.status === 201) {
        const updatedRestaurant = res.data.restaurant;
        dispatch({ type: RESTAURANT_ADD, payload: updatedRestaurant });
      }
      return res;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };




  return (
    <RestaurantContext.Provider
      value={{
        state,
        dispatch,
        getAllRestaurant,
        updateRestaurant,
        createRestaurant,
        editMenu,createMenu,
        deleteMenu,deleteRestaurant
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = ()=> useContext(RestaurantContext)