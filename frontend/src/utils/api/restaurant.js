// before using anyone : '/api/restaurants'
"use client";

const axios = require("./axiosInstance");
const allRestaurant = async () => {
  return await axios.get("/");
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
