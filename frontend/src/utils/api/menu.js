const axios = require('./axiosInstance');

const addMenuToRestaurant = async (restaurantId, menuData) => {
  try {
    const response = await axios.post(`/${restaurantId}/menu`, menuData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding menu to restaurant:", error.response || error.message || error);
    throw error;
  }
}

const editMenuItem = async (restaurantId, menuId, menuData) => {
  try {
    const response = await axios.post(`/${restaurantId}/menu/${menuId}`, menuData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing menu item:", error.response || error.message || error);
    throw error;
  }
}

const deleteMenuItem = async (restaurantId, menuId) => {
  try {
    const response = await axios.post(`/${restaurantId}/menu/${menuId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error.response || error.message || error);
    throw error;
  }
}

export {
  addMenuToRestaurant,editMenuItem,deleteMenuItem
};