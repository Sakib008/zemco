"use client";
import RestaurantCard from "@/components/RestaurantCard";
import { useRestaurant } from "@/context/restaurantContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import ReviewForm from '../../../components/ReviewForm';
import ReviewList from '../../../components/ReviewList';
import { getRestaurantReviews, deleteReview } from '../../../utils/api/review';

const page = () => {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('id');
  console.log("searchParams : ",searchParams)
  console.log("restaurant Id : ",restaurantId)
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch restaurant details and reviews
  const fetchRestaurantData = async () => {
    if (!restaurantId) return;
    
    try {
      setLoading(true);
      
     
      const restaurantResponse = await fetch(`http://localhost:3001/api/restaurants/${restaurantId}`);
      if (restaurantResponse.ok) {
        const restaurantData = await restaurantResponse.json();
        setRestaurant(restaurantData.restaurant);
        
        // If restaurant has reviews array populated, use it
        if (restaurantData.restaurant.reviews && restaurantData.restaurant.reviews.length > 0) {
          setReviews(restaurantData.restaurant.reviews);
        } else {
          // Otherwise fetch reviews separately
          const reviewsResponse = await getRestaurantReviews(restaurantId);
          setReviews(reviewsResponse.reviews || []);
        }
      } else {
        setError('Restaurant not found');
      }
    } catch (error) {
      setError('Failed to load restaurant data');
      console.error('Error fetching restaurant data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, [restaurantId]);

  const handleReviewSubmitted = () => {
    // Refresh both restaurant data and reviews after a new review is submitted
    fetchRestaurantData();
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      // Remove the deleted review from state
      setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
      
      // Also refresh restaurant data to update average rating
      fetchRestaurantData();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
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

  if (!restaurantId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Restaurant Not Found</h1>
            <p className="text-gray-600">Please provide a valid restaurant ID.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Loading restaurant data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
            <p className="text-gray-600">{error || 'Restaurant not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-2">{restaurant.cuisine} • {restaurant.address}</p>
              
              {/* Average Rating Display */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {renderStars(Math.round(restaurant.averageRating || 0))}
                </div>
                <span className="text-gray-600">
                  {restaurant.averageRating ? restaurant.averageRating.toFixed(1) : '0'} 
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">Restaurant ID</p>
              <p className="text-xs text-gray-400 font-mono">{restaurant._id}</p>
            </div>
          </div>

          {/* Menu Section */}
          {restaurant.menu && restaurant.menu.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Menu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurant.menu.map((dish, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{dish.name}</h4>
                      <span className="text-green-600 font-semibold">₹{dish.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      dish.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Review Form */}
          <div>
            <ReviewForm 
              restaurantId={restaurantId} 
              onReviewSubmitted={handleReviewSubmitted}
            />
          </div>

          {/* Review List */}
          <div>
            <ReviewList 
              reviews={reviews} 
              onDeleteReview={handleDeleteReview}
            />
          </div>
        </div>

        {/* ObjectId and Ref Explanation */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">How ObjectId and Refs Work</h3>
          <div className="space-y-3 text-sm text-blue-700">
            <p><strong>ObjectId:</strong> Each document in MongoDB gets a unique 24-character ObjectId (like: {restaurant._id})</p>
            <p><strong>Ref (Reference):</strong> The restaurant model stores review ObjectIds in its 'reviews' array</p>
            <p><strong>Population:</strong> When we fetch the restaurant, we use .populate() to replace ObjectIds with actual review documents</p>
            <p><strong>Relationship:</strong> This creates a one-to-many relationship between restaurants and reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
