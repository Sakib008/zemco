'use client';
import React from 'react';

const ReviewList = ({ reviews, onDeleteReview }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No reviews yet. Be the first to review this restaurant!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews ({reviews.length})</h3>
      
      {reviews.map((review) => (
        <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-800">{review.user}</h4>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-600">({review.rating}/5)</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </span>
          </div>
          
          <p className="text-gray-700 mt-2">{review.comment}</p>
          
          {onDeleteReview && (
            <button
              onClick={() => onDeleteReview(review._id)}
              className="mt-2 text-red-500 text-sm hover:text-red-700"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;