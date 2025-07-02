const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {type : Number,required : true},
  description: {type : String,required : true},
  isVeg : {type : Boolean, required : true}
});

const RestaurantSchema = new mongoose.Schema({
  name:       { type: String, required: true, unique: true },
  cuisine:    { type: String, required: true },
  address:    { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  menu:       [DishSchema],
  reviews:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
