const express = require('express');
const Router = express.Router();

const {
  createReview,
  getRestaurantReviews,
  getAllReviews,
  deleteReview
} = require('../controllers/review');

// Create a new review
Router.post('/', createReview);

// Get all reviews for a specific restaurant
Router.get('/restaurant/:restaurantId', getRestaurantReviews);

// Get all reviews (admin)
Router.get('/', getAllReviews);

// Delete a review
Router.delete('/:reviewId', deleteReview);

module.exports = Router;
