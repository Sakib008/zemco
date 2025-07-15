import React, { useState, useRef } from 'react';

const AddMenu = ({ open, setOpen, preFilled }) => {
  const [form, setForm] = useState(preFilled || { name: '', price: '', description: '', image: null });
  const [imagePreview, setImagePreview] = useState(preFilled?.image || null);
  const fileInputRef = useRef();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
      <div className="bg-white p-6 rounded-2xl shadow-lg min-w-[350px] relative" onClick={e => e.stopPropagation()}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setOpen(false)}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">{preFilled ? 'Edit Menu' : 'Add Menu'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Dish Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-semibold">Price</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-semibold">Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="w-full" />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 rounded bg-gray-300" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-red-500 text-white">{preFilled ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;