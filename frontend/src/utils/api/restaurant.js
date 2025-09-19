// before using anyone : '/api/restaurants'
"use client";

const axios = require("./axiosInstance");
const allRestaurant = async () => {
  try {
    console.log("Making API call to:", axios.defaults.baseURL);
    const response = await axios.get("/restaurants");
    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.error("Error in API : ", error.message)
    console.error("API Error:", error.response || error);
    throw error;
  }
};
const addRestaurant = async (restaurantDetail) => {
  if(restaurantDetail instanceof FormData){
      return await axios.post("/restaurants", restaurantDetail, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  }else{
    return await axios.post('/restaurants',restaurantDetail,{
      withCredentials : true
    })
  }
};
const singleRestaurant = async (id) => {
  return await axios.get(`/restaurants/${id}`);
};
const editRestaurant = async (id, updateData) => {
  if (updateData instanceof FormData) {
    return await axios.post(`/restaurants/${id}`, updateData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials : true
    });
  }
  return await axios.post(`/restaurants/${id}`, updateData,{
    withCredentials  : true
  });
};
const removeRestaurant = async (id) =>
await axios.post(`/restaurants/${id}`, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

const addImageRestaurant = async (formData) => {
  return await axios.post(`/image/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export {
  allRestaurant,
  addRestaurant,
  singleRestaurant,
  editRestaurant,
  removeRestaurant,
  addImageRestaurant,
};
