'use client';
import React, { useState } from 'react';
import { createReview } from '../utils/api/review';
import { useAuth } from '@/context/authContext';
import { useTheme } from '@/context/themeContext';

const ReviewForm = ({ restaurantId, onReviewSubmitted }) => {
  const {user} = useAuth()
  const {theme} = useTheme()
  const [formData, setFormData] = useState({
    user: `${user.firstname} ${user.lastname}`,
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const reviewData = {
        restaurantId,
        ...formData
      };

      await createReview(reviewData);
      
      // Reset form
      setFormData({
        user: `${user.firstname} ${user.lastname}`,
        rating: 5,
        comment: ''
      });

      // Notify parent component to refresh reviews
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

    } catch (error) {
      setError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={` p-6 rounded-lg shadow-md ${theme==="dark" && "bg-slate-900 text-white shadow-md shadow-blue-700 rounded-2xl"}`}>
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            required
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme==="dark" && "bg-slate-900 text-white"}`}
          >
            <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
            <option value="4">⭐⭐⭐⭐ Very Good (4)</option>
            <option value="3">⭐⭐⭐ Good (3)</option>
            <option value="2">⭐⭐ Fair (2)</option>
            <option value="1">⭐ Poor (1)</option>
          </select>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Review Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            required
            rows="4"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme==="dark" && "bg-slate-900 text-white"}`}
            placeholder="Share your experience with this restaurant..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;

