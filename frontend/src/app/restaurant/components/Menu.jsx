import AddMenu from "@/app/profile/components/AddMenu";
import { useState } from "react";

const Dish = ({ dish, open, setOpen ,restaurantId }) => {
    const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      {!open ? (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{dish.name}</h4>
            <span className="text-green-600 font-semibold">₹{dish.price}</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
          <span
            className={`inline-block px-2 py-1 rounded text-xs ${
              dish.isVeg
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
          </span>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{dish.name}</h2>
            <p className="text-gray-700 mb-4">{dish.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">₹{dish.price}</span>
              <span
                className={`inline-block px-2 py-1 rounded text-xs ${
                  dish.isVeg
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {dish.isVeg ? "Vegetarian" : "Non-Vegetarian"}
              </span>
            </div>
            <div className="flex justify-end space-x-2">

            <button
              onClick={() => setOpen(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
              Close
            </button>
            <button
              onClick={() => setOpenMenu(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
              Edit
            </button>
            <AddMenu menuId={dish._id} open={openMenu} setOpen={setOpenMenu} restaurantId={restaurantId} preFilled={dish} />
                </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dish;
