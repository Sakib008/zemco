// before using anyone : '/api/restaurants'

const axios = require("./axiosInstance");
const allRestaurant = async () => {
  return await axios.get("/");
};
const addRestaurant = async (restaurantDetail) => {
  return await axios.post("/", restaurantDetail);
};
const singleRestaurant = async (id) => {
  return await axios.get(`/${id}`);
};
const editRestaurant = async (id, updateData) => {
  return await axios.post(`/${id}`, updateData);
};
const removeRestaurant = async (id) => await axios.post(`/${id}`);

export {
  allRestaurant,
  addRestaurant,
  singleRestaurant,
  editRestaurant,
  removeRestaurant,
};
