const express = require('express')
const router = express.Router()

//Controller
const userController = require('../controllers/user')
//Models
const User  = require('../models/user')
const models = {
  User,
}

//middleware
const {authAdmin} = require('../utils/authAdmin')

//habilitando middleware de validação de token 
router.use(authAdmin)

//será a rota principal do recurso /series 
//que vamos definir dentro do módulo server
router.get('/', userController.list.bind(null, models) )
router.post('/', userController.create.bind(null, models) )
router.delete('/all/documents', userController.removeAllDocuments.bind(null, models) )

module.exports = router