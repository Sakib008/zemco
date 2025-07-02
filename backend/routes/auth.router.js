const express = require('express')
const { logUser, createUser } = require('../controllers/auth')
const Router = express.Router()

Router.get('/login',logUser)
Router.post('/register',createUser)

module.exports = Router;