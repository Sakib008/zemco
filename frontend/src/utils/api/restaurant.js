// before using anyone : '/api/restaurants'

const axios = require("./axiosInstance");
const allRestaurant = async () => {
  return await axios.get("/");
};
const addRestaurant = async (restaurantDetail) => {
  return await axios.post("/", restaurantDetail,{
  });
};
const singleRestaurant = async (id) => {
  return await axios.get(`/${id}`);
};
const editRestaurant = async (id, updateData) => {
  if (updateData instanceof FormData) {
    return await axios.post(`/${id}`, updateData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
  return await axios.post(`/${id}`, updateData);
};
const removeRestaurant = async (id) => await axios.post(`/${id}`);

const addImageRestaurant = async (formData)=>{
  return await axios.post('http://localhost:3001/api/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
}

export {
  allRestaurant,
  addRestaurant,
  singleRestaurant,
  editRestaurant,
  removeRestaurant,
  addImageRestaurant
};
