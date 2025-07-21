const express = require('express')
const Router = express.Router()
const upload = require('../mutler')
const {getAllRestaurant,createRestaurant,getSingleRestaurant,updateRestaurant,deleteRestaurant} = require("../controllers/restaurant")
const { createDish, deleteDish, editDish } = require("../controllers/dish");
const authVerify = require('../middlewares/authVarify');

Router.get('/',getAllRestaurant);
Router.post('/',authVerify,upload.single('image'), createRestaurant)
Router.get('/:id', getSingleRestaurant);
Router.post('/:id',authVerify,upload.single('image'), updateRestaurant);
Router.post('/:id',authVerify, deleteRestaurant);

//  dish for restaurant menu
Router.post('/:id/menu',authVerify,upload.single('image'), createDish);

Router.post('/:id/menu/:menuId',authVerify,deleteDish)

Router.post('/:id/menu/:menuId',authVerify,upload.single('image'),editDish)

module.exports = Router;