// before using anyone : '/api/restaurants'
"use client";

const axios = require("./axiosInstance");
const allRestaurant = async () => {
  try {
    console.log("Making API call to:", axios.defaults.baseURL);
    const response = await axios.get("/");
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
      return await axios.post("/", restaurantDetail, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  }else{
    return await axios.post('/',restaurantDetail,{
      withCredentials : true
    })
  }
};
const singleRestaurant = async (id) => {
  return await axios.get(`/${id}`);
};
const editRestaurant = async (id, updateData) => {
  if (updateData instanceof FormData) {
    return await axios.post(`/${id}`, updateData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials : true
    });
  }
  return await axios.post(`/${id}`, updateData,{
    withCredentials  : true
  });
};
const removeRestaurant = async (id) =>
  await axios.post(`/${id}`, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

const addImageRestaurant = async (formData) => {
  return await axios.post("http://localhost:3001/api/image/upload", formData, {
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
