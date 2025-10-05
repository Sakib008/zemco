const Restaurant = ({ restaurant }) => {
  return (
    <div
      key={restaurant._id}
      className="w-full h-full md:px-5 md:mb-4 mb-2 p-2 rounded-lg shadow-md bg-neutral-100"
    >
      <div className="flex p-2 justify-between items-center">
        <h2>{restaurant.name}</h2>
        <div className="text-sm text-gray-500">
          <p className="text-gray-500">
            {restaurant.cuisine} •{" "}
            {restaurant.averageRating
              ? restaurant.averageRating.toFixed(1)
              : "0"}
            ({restaurant.reviews.length} reviews)
          </p>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">{restaurant.address}</div>
    </div>
  );
};

export default Restaurant;
