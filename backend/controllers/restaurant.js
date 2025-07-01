const Restaurant = require("../models/restaurent.model");

const createRestaurant = async (req, res) => {
  try {
    const { name, cuisine, address, menu } = req.body;

    const exists = await Restaurant.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Restaurant already exists" });

    const newRestaurant = new Restaurant({
      name,
      cuisine,
      address,
      menu,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
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
    console.error(error);
    res.status(500).json({
      message: "There is something bad on Server.",
      error: error.message,
    });
    throw error;
  }
};

// GET /restaurants/:id – Single restaurant
const getSingleRestaurant = async (req,res)=>{
  try {
    const {id} = req.param;
    const foundRestaurant = await Restaurant.findById(id)
    if(foundRestaurant) res.status(200).json({message : "Your Restaurant fetched Successfully",Restaurant : foundRestaurant})
      res.status(400).json({message : "Check Carefully Your Entered Restaurant Id"})
  } catch (error) {
    res.status(500).json({message : "Something is getting Wrong , See Carefully", error : error.message})

  }
}

// GET /restaurants/search?name=xyz
const searchRestaurant = async (req,res)=>{
  try {
    const {name,cuisine,dish}= req.query;
    const query = {}
    if(name){
      query.name = { $regex : name, $option : 'i'};
    }
    if(cuisine){
    query.cuisine = {$regex : cuisine , $option : 'i'}
    }
    if(dish){
      query["menu.name"] = {$regex : dish,$option : "i"}
    }
    const restaurants = await Restaurant.find(query);
    if(!restaurants) res.status(400).json({message : " Name of This Restaurant or Dish is not Available"})
    res.status(201).json({message : "Your Query got Succeed", restaurants})
  } catch (error) {
     res.status(500).json({
      message: "Error searching restaurants",
      error: error.message,
    });
  }
}

// POST /restaurants/:id – Update address/rating
const updateRestaurant = async (req,res)=>{
  try {
    const {id} = req.param;
    const data = req.body;
    if(!id) res.status(400).json({message : "Your Entered Id is wrong ,see Carefully"})
    if(id){
      const restaurant = await Restaurant.findById(id);
      const updatedRestaurant = Object.assign(restaurant,data);
      const saveRestaurant = await updateRestaurant.save();
      res.status(201).json({message : "Your Restaurant got Update",restaurant : saveRestaurant})
    }
  } catch (error) {
    res.status(500).json({message : "Unable to Edit the data ", error : error.message})
  }
}

// DELETE /restaurants/:id
const deleteRestaurant = async (req,res)=>{
  try {
    const {id} = req.param ;
    if(!id) res.status(400).json({message : "Unable to find the Restaurant"});
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: "This Restaurant is not available" });
    }
    if(restaurant){
      const deleted = await Restaurant.findByIdAndDelete(id)
      res.status(402).json({message : "your restaurant deleted successfully",restaurant : deleted})
    }
  } catch (error) {
    res.status(500).json({message : 'Unable to Delete this Restaurant',error : error.message})
  }
}
module.exports = { createRestaurant, getAllRestaurant,getSingleRestaurant,searchRestaurant,updateRestaurant,deleteRestaurant };
