const Restaurant = require("../models/restaurent.model");

const createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, address, menu } = req.body;
    const isAdmin = req.user.isAdmin;
    if(!isAdmin){
      return res.status(404).json({message : "You are not authorized to do this.(Only for Admin)"})
    }
    const exists = await Restaurant.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Restaurant already exists" });
    const imageUrl = req.file ? req.file.path : undefined;
    const newRestaurant = new Restaurant({
      name,
      cuisine,
      address,
      menu,
      image : imageUrl
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({message : "your restaurant got added", restaurant : savedRestaurant});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating restaurant", error: error.message });
  }
};

const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      message: "All Restaurents are Successfully Succeed",
      restaurants,
    });
  } catch (error) {
    console.error({ message: "Error fetching restaurants", error: error.message });
    res.status(500).json({
      message: "There is something bad on Server.",
      error: error.message,
    });
    throw error;
  }
};

// GET /restaurants/:id – Single restaurant
const getSingleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const foundRestaurant = await Restaurant.findById(id)
      .populate('reviews', 'user rating comment createdAt')
      .exec();
    
    if (foundRestaurant) {
      res.status(200).json({
        message: "Your Restaurant fetched Successfully",
        restaurant: foundRestaurant,
      });
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something is getting Wrong , See Carefully",
      error: error.message,
    });
  }
};

// GET /restaurants/search?name=xyz
const searchRestaurant = async (req, res) => {
  try {
    const { name, cuisine, dish } = req.query;
    const query = {};
    if (name) {
      query.name = { $regex: name, $option: "i" };
    }
    if (cuisine) {
      query.cuisine = { $regex: cuisine, $option: "i" };
    }
    if (dish) {
      query["menu.name"] = { $regex: dish, $option: "i" };
    }
    const restaurants = await Restaurant.find(query);
    if (!restaurants)
      res
        .status(400)
        .json({ message: " Name of This Restaurant or Dish is not Available" });
    res.status(201).json({ message: "Your Query got Succeed", restaurants });
  } catch (error) {
    res.status(500).json({
      message: "Error searching restaurants",
      error: error.message,
    });
  }
};

// POST /restaurants/:id – Update address/rating
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const {name,cuisine,address} = req.body;
    const isAdmin = req.user.isAdmin;
    if(!isAdmin){
      return res.status(404).json({message : "You are not authorized to do this.(Only for Admin)"})
    }
    if (!id) {
      return res.status(400).json({ message: "Your Entered Id is wrong ,see Carefully" });
    }

    const restaurant = await Restaurant.findById(id);
    
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const imageUrl = req.file ? req.file.path : undefined ;

    const newRestaurant = ({
      name,address,cuisine,image : imageUrl
    })
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, newRestaurant, { new: true });
    res.status(200).json({
      message: "Your Restaurant got Update",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to Edit the data ", error: error.message });
  }
};

// DELETE /restaurants/:id
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = req.user.isAdmin;
    if(!isAdmin){
      return res.status(404).json({message : "You are not authorized to do this.(Only for Admin)"})
    }
    if (!id) {
      return res.status(400).json({ message: "Unable to find the Restaurant" });
    }
    
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: "This Restaurant is not available" });
    }
    
    const deleted = await Restaurant.findByIdAndDelete(id);
    res.status(200).json({
      message: "your restaurant deleted successfully",
      restaurant: deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to Delete this Restaurant",
      error: error.message,
    });
  }
};
module.exports = {
  createRestaurant,
  getAllRestaurant,
  getSingleRestaurant,
  searchRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
