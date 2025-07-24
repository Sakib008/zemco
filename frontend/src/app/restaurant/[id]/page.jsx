"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReviewForm from "../../../components/ReviewForm";
import ReviewList from "../../../components/ReviewList";
import { getRestaurantReviews, deleteReview } from "../../../utils/api/review";
import Header from "../../../components/Header/Header";
import { singleRestaurant } from "@/utils/api";
import AddRestaurant from "@/app/profile/components/AddRestaurant";
import Image from "next/image";
import { useTheme } from "@/context/themeContext";
import AddMenu from "@/app/profile/components/AddMenu";
import Dish from "../components/Menu";

const RestaurantPage = () => {
  const { id } = useParams();
  const restaurantId = id;

  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { theme } = useTheme();
  const [openDish, setOpenDish] = useState(false);

  // Fetch restaurant details and reviews
  const fetchRestaurantData = async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      const {
        data: { restaurant },
        status,
      } = await singleRestaurant(restaurantId);

      if (status === 200 || status === 201) {
        setRestaurant(restaurant);

        if (restaurant.reviews && restaurant.reviews.length > 0) {
          setReviews(restaurant.reviews);
        } else {
          const reviewsResponse = await getRestaurantReviews(restaurantId);
          setReviews(reviewsResponse.reviews || []);
        }
      } else {
        setError("Restaurant not found");
      }
    } catch (error) {
      setError("Failed to load restaurant data");
      console.error("Error fetching restaurant data:", error);
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
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );

      // Also refresh restaurant data to update average rating
      fetchRestaurantData();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (!restaurantId) {
    return (
      <div
        className={`min-h-screen bg-gray-50 py-8 ${
          theme === "dark" && "bg-slate-900 text-white"
        }`}
      >
        <Header />
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Restaurant Not Found
            </h1>
            <p className="text-gray-600">
              Please provide a valid restaurant ID.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <Header />
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
        <Header />
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
            <p className="text-gray-600">{error || "Restaurant not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 py-8 ${
        theme === "dark" && "bg-slate-900 text-white"
      }`}
    >
      <Header />
      <div
        className={`max-w-6xl mx-auto px-4 ${
          theme === "dark" && "bg-slate-900 text-white"
        }`}
      >
        {/* Restaurant Header */}
        <div
          className={`bg-white rounded-lg shadow-md p-6 mb-8 ${
            theme === "dark" && "bg-slate-900 text-white"
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h1
                className={`text-3xl font-bold text-gray-800 mb-2 ${
                  theme === "dark" && "bg-slate-900 text-white"
                }`}
              >
                {restaurant.name}
              </h1>
              <p className="text-gray-600 mb-2">
                {restaurant.cuisine} • {restaurant.address}
              </p>

              {/* Average Rating Display */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {renderStars(Math.round(restaurant.averageRating || 0))}
                </div>
                <span className="text-gray-600">
                  {restaurant.averageRating
                    ? restaurant.averageRating.toFixed(1)
                    : "0"}
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Restaurant ID</p>
              <p className="text-xs text-gray-400 font-mono">
                {restaurant._id}
              </p>
              <div className="my-3 ">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-blue-500  text-white p-1 px-4 rounded-xl"
                >
                  Edit
                </button>
                <AddRestaurant
                  open={open}
                  setOpen={setOpen}
                  preFilled={restaurant}
                  onUpdate={fetchRestaurantData}
                />
                <button
                  onClick={() => setOpenMenu(true)}
                  className="bg-green-600  text-white p-1 px-4 rounded-xl"
                >
                  Add Menu
                </button>
                <AddMenu
                  open={openMenu}
                  setOpen={setOpenMenu}
                  restaurantId={restaurant._id}
                  onUpdate={fetchRestaurantData}
                />
              </div>
            </div>
          </div>

          {/* Menu Section */}
          {restaurant.menu && restaurant.menu.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Menu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurant.menu.map((dish, index) => (
                  <div key={index} onClick={() => setOpenDish(true)} className="cursor-pointer">

                    <Dish dish={dish} open={openDish} setOpen={setOpenDish} restaurantId={restaurant._id} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Image Section  */}
        {restaurant.image && (
          <div className="w-full h-80 relative my-6">
            <Image
              fill
              className="object-cover rounded-xl"
              alt={restaurant.name}
              src={restaurant.image}
            />
          </div>
        )}
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
            <ReviewList reviews={reviews} onDeleteReview={handleDeleteReview} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
