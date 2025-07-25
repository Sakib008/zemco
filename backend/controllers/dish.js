const Restaurant = require("../models/restaurent.model");
const createDish = async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res
        .status(404)
        .json({
          message: "You are not authorized to do this.(Only for Admin)",
        });
    }
    const { name, price, description, isVeg } = req.body;
    if (!name || !price || !description || isVeg === undefined) {
      return res.status(400).json({
        message: "All fiels (name,price,description,isVeg) are required.",
      });
    }
    const foundRestaurant = await Restaurant.findById(id);
    if (!foundRestaurant)
      return res.status(400).json({ message: "Restaurant not found" });

    const newDish = {
      name,
      price: Number(price),
      description,
      isVeg: Boolean(isVeg),
      image : req.file ? req.file.path : undefined,
    };
    foundRestaurant.menu.push(newDish);
    await foundRestaurant.save();
    res.status(201).json({
      message: "New Dish Added Successfully",
      Dish: newDish,
      Restaurant: foundRestaurant.name,
    });
  } catch (error) {
    console.error("Error creating dish : ", error.message);
    res.status(500).json({
      message: "Internal Server Error", error: error.message || error,
    });
  }
};

const editDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { menuId } = req.params;
    const { name, price, description, isVeg } = req.body;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res
        .status(404)
        .json({
          message: "You are not authorized to do this.(Only for Admin)",
        });
    }

    const foundRestaurant = await Restaurant.findById(id);
    const foundDish = await Restaurant.menu.findById(menuId);

    if (!foundRestaurant) {
      return res
        .status(400)
        .json({ message: "No restaurent is found with this Id" });
    }

    if (!foundDish) {
      return res.status(400).json({ message: "No dish found with this Id" });
    }

    if (!name || !price || !description || isVeg === undefined) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const newDish = {
      name,
      price: Number(price),
      description,
      isVeg: Boolean(isVeg),
      image: req.file ? req.file.path : foundDish.image,
    };
    const editDish = foundRestaurant.menu.findByIdAndUpdate(menuId, newDish);
    await foundRestaurant.save();

    res.status(201).json({
      message: "dish updated Successfully",
      dish: editDish,
      restaurant: foundRestaurant.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message : "Internal Server error", error: error.message || error });
  }
};

const deleteDish = async (req, res) => {
  try {
    const { id, menuId } = req.params;
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res
        .status(404)
        .json({
          message: "You are not authorized to do this.(Only for Admin)",
        });
    }
    const foundRestaurant = await Restaurant.findById(id);
    if (!foundRestaurant) {
      return res
        .status(400)
        .json({ error: "Restaurant is not found with this id" });
    }
    const foundMenu = foundRestaurant.menu.findById(menuId);
    if (!foundMenu) {
      return res.status(400).json({ error: "No Dish found with this DishId" });
    }
    foundMenu.remove();
    await foundRestaurant.save();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message, message: "Internal Server Error" });
  }
};

module.exports = { createDish, deleteDish, editDish };
