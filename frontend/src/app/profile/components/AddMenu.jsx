import { useRestaurant } from "@/context/restaurantContext";
import React, { useState, useRef } from "react";

const AddMenu = ({ open, setOpen, preFilled, onUpdate,restaurantId,menuId }) => {
  const [form, setForm] = useState(
    preFilled || { name: "", price: "", description: "", isVeg : true, image: null }
  );
  const [imagePreview, setImagePreview] = useState(preFilled?.image || form.image || null);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createMenu, editMenu } = useRestaurant();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let formData;
      if (form.image && form.image instanceof File) {
        formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("isVeg", form.isVeg);
        formData.append("image", form.image);
        
      } else {
        formData = { ...form };
      }
      if (!form.name || !form.price || !form.description) {
        setError("All fields are required.");
        return;
      }
      if (form.price <= 0) {
        setError("Price must be greater than zero.");
        return;
      }
      if (form.name.length < 3) {
        setError("Dish name must be at least 3 characters long.");
        return;
      }

      if (preFilled && preFilled._id) {
        // Call update function here
        await editMenu(preFilled._id, formData);
        if (onUpdate) {
          onUpdate();
        }
      } else {
        // Call create function here
        await createMenu(restaurantId,formData);
        if (onUpdate) {
          onUpdate();
        }
      }
      setOpen(false);
      setForm({ name: "", price: "", description: "", image: null });
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to submit menu item. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setForm({ name: "", price: "", description: "", image: null });
    setImagePreview(null);
  };
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white text-left p-6 rounded-2xl shadow-lg min-w-[350px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {preFilled ? "Edit Menu" : "Add Menu"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block font-semibold">Dish Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-semibold">Is Vegetarian?</label>
              <select
                name="isVeg"
                value={form.isVeg}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

            </div>
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Image</label>
            <input
              type="file"
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
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-red-500 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {preFilled && loading
                ? "Updating..."
                : "Adding..." || preFilled
                ? "Update"
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
