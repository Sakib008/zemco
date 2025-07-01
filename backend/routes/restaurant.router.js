const express = require('express')
const Router = express.Router()

const {getAllRestaurant,createRestaurant,getSingleRestaurant,updateRestaurant,deleteRestaurant} = require("../controllers/restaurant")

Router.get('/',getAllRestaurant);
Router.post('/',createRestaurant)
Router.get('/:id', getSingleRestaurant);
Router.post('/:id', updateRestaurant);
Router.post('/:id', deleteRestaurant);

module.exports = Router;