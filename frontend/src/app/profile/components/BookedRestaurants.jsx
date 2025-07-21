import React, { useState, useRef } from 'react';

const BookedRestaurants = ({ open, setOpen, preFilled }) => {
  const [form, setForm] = useState(preFilled || { date: '', time: 'lunch', guests: 1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        <h2 className="text-2xl font-bold mb-4">{preFilled ? 'Edit Booking' : 'Book Restaurant'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block font-semibold">Time</label>
            <select name="time" value={form.time} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Guests</label>
            <input type="number" name="guests" min="1" value={form.guests} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 rounded bg-gray-300" onClick={() => setOpen(false)}>Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-red-500 text-white">{preFilled ? 'Update' : 'Book'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookedRestaurants;