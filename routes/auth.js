const express = require('express')
const router = express.Router()

//controller
const authController = require('../controllers/auth')

// Model
const User = require('../models/user')

// objeto de models injetado nas rotas 
const models = {
    User,
}


router.post('/', authController.auth.bind(null, models))

module.exports = router