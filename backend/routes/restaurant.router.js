const express = require('express')
const Router = express.Router()

const {getAllRestaurant,createRestaurant,getSingleRestaurant,updateRestaurant,deleteRestaurant} = require("../controllers/restaurant")
const { createDish, deleteDish, editDish } = require("../controllers/dish")

Router.get('/',getAllRestaurant);
Router.post('/',createRestaurant)
Router.get('/:id', getSingleRestaurant);
Router.post('/:id', updateRestaurant);
Router.post('/:id', deleteRestaurant);

// Add dish to restaurant menu
Router.post('/:id/menu', createDish);
// Delete dish from restaurant menu
Router.post('/:id/menu/:menuId',deleteDish)
// Edit dish to restaurant menu
Router.post('/:id/menu/:menuId',editDish)

module.exports = Router;