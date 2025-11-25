import React, { useEffect, useState, useRef } from "react";
import { useRestaurant } from "@/context/restaurantContext";
import { useTheme } from "@/context/themeContext";

const AddRestaurant = ({open,setOpen, preFilled, onUpdate, isInline = false }) => {
  const [form, setForm] = useState(
    preFilled || { name: "", cuisine: "Indian", address: "", image: null }
  );
  const [imagePreview, setImagePreview] = useState(preFilled?.image || null);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  const handleReset = () => {
    setForm({ name: "", cuisine: "Indian", address: "", image: null });
    setImagePreview(null);
    setError("");
    setSuccess("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      let dataToSend;
      if (form.image instanceof File) {
        dataToSend = new FormData();
        dataToSend.append("name", form.name);
        dataToSend.append("cuisine", form.cuisine);
        dataToSend.append("address", form.address);
        dataToSend.append("image", form.image);
      } else {
        dataToSend = { ...form };
      }

      if (!form.name || !form.address) {
        setError("Name and Address are required.");
        return;
      }
      if (form.name.length < 3) {
        setError("Restaurant name must be at least 3 characters long.");
        return;
      }
      if (form.address.length < 5) {
        setError("Address must be at least 5 characters long.");
        return;
      }
      if (form.cuisine && !allowedCuisine.includes(form.cuisine)) {
        setError("Invalid cuisine selected.");
        return;
      }

      if (preFilled && preFilled._id) {
        await updateRestaurant(preFilled._id, dataToSend);
        setSuccess("Restaurant updated successfully!");
      } else {
        await createRestaurant(dataToSend);
        setSuccess("Restaurant added successfully!");
      }

      if (onUpdate) {
        onUpdate();
      }

      // Reset form after successful submission (only for inline mode)
      if (isInline) {
        handleReset();
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to save restaurant. Please try again."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // Inline version (for dashboard)
  if (isInline) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            theme === "dark" ? "bg-slate-900" : "bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6">
            {preFilled ? "Edit Restaurant" : "Add New Restaurant"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}
            <div>
              <label className="block font-semibold mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${
                  theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
                }`}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Cuisine *</label>
              <select
                name="cuisine"
                value={form.cuisine}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${
                  theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
                }`}
              >
                {allowedCuisine.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Address *</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${
                  theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
                }`}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Image</label>
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
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading
                  ? preFilled
                    ? "Updating..."
                    : "Adding..."
                  : preFilled
                  ? "Update Restaurant"
                  : "Add Restaurant"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  console.log("Add Restaurant", open);
  if(!open) return null;
  // Modal version (original functionality)
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex text-left items-center justify-center z-50"
      onClick={handleReset}
    >
      <div
        className={`p-6 rounded-2xl shadow-lg min-w-[350px] relative ${
          theme === "dark" ? "bg-slate-900" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
          onClick={handleReset}
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
              className={`w-full border rounded px-3 py-2 ${
                theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
              }`}
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Cuisine</label>
            <select
              name="cuisine"
              value={form.cuisine}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${
                theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
              }`}
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
              className={`w-full border rounded px-3 py-2 ${
                theme === "dark" ? "bg-slate-800 text-white" : "bg-white"
              }`}
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
              className="px-4 py-2 rounded bg-gray-400"
              onClick={handleReset}
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