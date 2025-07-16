import React, { useEffect, useState, useRef } from "react";
import { useRestaurant } from "@/context/restaurantContext";

const AddRestaurant = ({ open, setOpen, preFilled }) => {
  const [form, setForm] = useState(preFilled || { name: "", cuisine: "indian", address: "", image: null });
  const [imagePreview, setImagePreview] = useState(preFilled?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateRestaurant, } = useRestaurant();
  const allowedCuisine = [
    "indian",
    "chinese",
    "mughlai",
    "south indian",
    "punjabi",
    "fusion",
    "rajasthani",
    "kerala",
    "multi-cuisine",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (preFilled && preFilled._id) {
        // Update restaurant
        await updateRestaurant(preFilled._id, form);
      } else {
        // TODO: Add restaurant logic if needed
      }
      setOpen(false);
      setForm({ name: "", cuisine: "indian", address: "", image: null });
      setImagePreview(null);

    } catch (err) {
      setError("Failed to update restaurant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
      <div className="bg-white p-6 rounded-2xl shadow-lg min-w-[350px] relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setOpen(false)}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">{preFilled ? 'Edit Restaurant' : 'Add Restaurant'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <label className="block font-semibold">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-semibold">Cuisine</label>
            <select name="cuisine" value={form.cuisine} onChange={handleChange} className="w-full border rounded px-3 py-2">
              {allowedCuisine.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-semibold">Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="w-full" />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 rounded bg-gray-300" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-red-500 text-white" disabled={loading}>{loading ? (preFilled ? 'Updating...' : 'Adding...') : (preFilled ? 'Update' : 'Add')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
