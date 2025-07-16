const mongoose = require('mongoose')

const DishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: {type : Number,required : true},
  description: {type : String,required : true},
  isVeg : {type : Boolean, required : true},
  image : {type : String},
  restaurantId : {type : mongoose.Schema.Types.ObjectId , ref : 'Restaurant'}
});

const RestaurantSchema = new mongoose.Schema({
  name:       { type: String, required: true, unique: true },
  cuisine:    { type: String, required: true ,enum : ['indian',"chinese",'mughlai','south indian','punjabi','fusion','rajasthani','kerala','multi-cuisine'] },
  address:    { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  image : {type : String},
  menu:       [DishSchema],
  reviews:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
