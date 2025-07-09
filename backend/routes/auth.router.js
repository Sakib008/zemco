const express = require('express')
const { logUser, createUser } = require('../controllers/auth')
const Router = express.Router()

Router.post('/login',logUser)
Router.post('/register',createUser)

module.exports = Router;