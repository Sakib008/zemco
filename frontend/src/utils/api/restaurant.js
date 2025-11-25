// before using anyone : '/api/restaurants'
"use client";

const axios = require("./axiosInstance");
const allRestaurant = async () => {
  try {
    const response = await axios.get("/restaurants");
    return response;
  } catch (error) {
    throw error;
  }
};
const addRestaurant = async (restaurantDetail) => {
  return await axios.post("/restaurants", restaurantDetail, {
    withCredentials: true,
  });
};
const singleRestaurant = async (id) => {
  return await axios.get(`/restaurants/${id}`);
};
const editRestaurant = async (id, updateData) => {
  return await axios.post(`/restaurants/${id}`, updateData, {
    withCredentials: true,
  });
};
const removeRestaurant = async (id) =>
  await axios.post(`/restaurants/${id}`, {
    withCredentials: true,
  });

const addImageRestaurant = async (formData) => {
  return await axios.post(`/image/upload`, formData);
};

export {
  allRestaurant,
  addRestaurant,
  singleRestaurant,
  editRestaurant,
  removeRestaurant,
  addImageRestaurant,
};
