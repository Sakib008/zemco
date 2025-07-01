const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  user:         { type: String, required: true }, // or userId if you have User model
  rating:       { type: Number, required: true, min: 1, max: 5 },
  comment:      { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);