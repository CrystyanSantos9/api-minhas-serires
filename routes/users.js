const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'vegetaABC123'

const User  = require('../models/user')

router.use(async (req, res, next)=>{
   const token = req.body.token || req.query.token  || req.headers['x-access-token']
   if(token){
     try{
       const payload = jwt.verify(token, jwtSecret)
       console.log(payload)
       if(payload.roles.indexOf('admin') >= 0){
          next()
       }else{
        res.send({success: 'user does not have permission to access the destination resource.'})
       }
     }catch (e){
        res.send({success: false})
     }
   }else{
     //se o token não existe
     res.send({success: false})
   }
})

//será a rota principal do recurso /series 
//que vamos definir dentro do módulo server
router.get('/', async (req, res)=>{
    const users = await User.find({})
    res.send(users)
})

module.exports = router