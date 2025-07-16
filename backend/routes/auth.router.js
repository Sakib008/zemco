const express = require('express')
const { logUser, createUser, logoutUser, getMe } = require('../controllers/auth')
const authVerify = require('../middlewares/authVarify')
const Router = express.Router()

Router.post('/login',logUser)
Router.post('/register',createUser)
Router.get('/logout',logoutUser)
Router.get('/me', authVerify, getMe)

module.exports = Router;