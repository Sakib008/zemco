import React, { useEffect, useState, useRef } from "react";
import { useRestaurant } from "@/context/restaurantContext";
import { data } from "autoprefixer";

const AddRestaurant = ({ open, setOpen, preFilled, onUpdate }) => {
  const [form, setForm] = useState(
    preFilled || { name: "", cuisine: "Indian", address: "", image: null }
  );
  const [imagePreview, setImagePreview] = useState(preFilled?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateRestaurant, createRestaurant } = useRestaurant();
  const allowedCuisine = [
    "Indian",
    "Chinese",
    "Mughlai",
    "South Indian",
    "Punjabi",
    "Fusion",
    "Rajasthani",
    "Kerala",
    "Multi-Cuisine",
  ];
  const fileInputRef = useRef();

  useEffect(() => {
    if (preFilled) {
      setForm(preFilled);
      setImagePreview(preFilled.image || null);
    }
  }, [preFilled]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleClose = () => {
    setForm({ name: "", cuisine: "indian", address: "", image: null });
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let dataToSend;
      if (form.image instanceof File) {
        dataToSend = new FormData();
        dataToSend.append("name", form.name);
        dataToSend.append("cuisine", form.cuisine);
        dataToSend.append("address", form.address);
        dataToSend.append("image", form.image);
        if (form.menu) dataToSend.append("menu", JSON.stringify(form.menu));
      } else {
        dataToSend = { ...form };
      }
      console.log("Submitting:", dataToSend);
      console.log("form data to submit : ", form);
      if (!dataToSend.name || !dataToSend.address) {
        setError("Name and Address are required.");
        return;
      }
      if (dataToSend.name.length < 3) {
        setError("Restaurant name must be at least 3 characters long.");
        return;
      } 
      if (dataToSend.address.length < 5) {
        setError("Address must be at least 5 characters long.");  
        return;
      }
      if (dataToSend.cuisine && !allowedCuisine.includes(dataToSend.cuisine)) {
        setError("Invalid cuisine selected.");
        return;
      }

      if (preFilled && preFilled._id) {
        await updateRestaurant(preFilled._id, dataToSend);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        await createRestaurant(dataToSend);
        if (onUpdate) {
          onUpdate();
        }
      }
      setOpen(false);
      setForm({ name: "", cuisine: "Indian", address: "", image: null });
      setImagePreview(null);
    } catch (err) {
      console.error("Submit error:", err);
      console.log("Error Message : ", err.response || err.message);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update restaurant. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex text-left items-center justify-center z-50"
      onClick={preFilled ? () => setOpen(false) : handleClose}
    >
      <div
        className="bg-white p-6 rounded-2xl shadow-lg min-w-[350px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={preFilled ? () => setOpen(false) : handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {preFilled ? "Edit Restaurant" : "Add Restaurant"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Cuisine</label>
            <select
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              {allowedCuisine.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="w-full"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={preFilled ? () => setOpen(false) : handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-500 text-white"
              disabled={loading}
            >
              {loading
                ? preFilled
                  ? "Updating..."
                  : "Adding..."
                : preFilled
                ? "Update"
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
