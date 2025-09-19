const axios = require('./axiosInstance');

// Create a new review
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`/reviews`, reviewData);
    if (response.status !== 201 || response.status !== 200) {
      throw new Error('Failed to create review');
    }
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Get all reviews for a restaurant
export const getRestaurantReviews = async (restaurantId) => {
  try {
    const response = await axios.get(`/reviews/restaurant/${restaurantId}`);
    
    if (response.status !== 200 || response.status !== 201) {
      throw new Error('Failed to fetch reviews');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error || error.message);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`/reviews/${reviewId}`);

    if (response.status !== 200 || response.status !== 201) {
      throw new Error('Failed to delete review');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error || error.message);
    throw error;
  }
};

