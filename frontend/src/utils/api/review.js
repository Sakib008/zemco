const API_BASE_URL = 'http://localhost:3001/api';

// Create a new review
export const createReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error('Failed to create review');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Get all reviews for a restaurant
export const getRestaurantReviews = async (restaurantId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/restaurant/${restaurantId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete review');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

