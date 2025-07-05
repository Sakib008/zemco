const Review = require('../models/review.model');
const Restaurant = require('../models/restaurent.model');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { restaurantId, user, rating, comment } = req.body;
    
    // Validate input
    if (!restaurantId || !user || !rating || !comment) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Create the review
    const review = new Review({
      restaurantId,
      user,
      rating,
      comment
    });

    const savedReview = await review.save();

    // Add review to restaurant's reviews array
    restaurant.reviews.push(savedReview._id);
    
    // Calculate new average rating
    const allReviews = await Review.find({ restaurantId });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    restaurant.averageRating = totalRating / allReviews.length;
    
    await restaurant.save();

    res.status(201).json({
      message: 'Review created successfully',
      review: savedReview
    });

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all reviews for a restaurant
const getRestaurantReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    const reviews = await Review.find({ restaurantId })
      .sort({ createdAt: -1 }); // Most recent first
    
    res.status(200).json({
      reviews,
      count: reviews.length
    });

  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all reviews (for admin purposes)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('restaurantId', 'name')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      reviews,
      count: reviews.length
    });

  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove review from restaurant's reviews array
    const restaurant = await Restaurant.findById(review.restaurantId);
    if (restaurant) {
      restaurant.reviews = restaurant.reviews.filter(
        revId => revId.toString() !== reviewId
      );
      
      // Recalculate average rating
      const remainingReviews = await Review.find({ restaurantId: review.restaurantId });
      if (remainingReviews.length > 0) {
        const totalRating = remainingReviews.reduce((sum, rev) => sum + rev.rating, 0);
        restaurant.averageRating = totalRating / remainingReviews.length;
      } else {
        restaurant.averageRating = 0;
      }
      
      await restaurant.save();
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });

  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createReview,
  getRestaurantReviews,
  getAllReviews,
  deleteReview
};
