const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'vegetaABC123'

const Serie = require('../models/series')

router.use(async (req, res, next)=>{
   const token = req.body.token || req.query.token  || req.headers['x-access-token']
   if(token){
     try{
       const payload = jwt.verify(token, jwtSecret)
       console.log(payload)
       if(payload.roles.indexOf('restrito') >= 0){
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
    const series = await Serie.find({})
    res.send(series)
})

router.post('/', async (req, res)=>{
    const serie = new Serie(req.body)
    try{
        await serie.save()
        res.send(serie)
    }catch (e){
        res.send({
            success: false,
            errors: Object.keys(e.errors)
        })
    }
})

router.delete('/:id', async (req, res) => {
    await Serie.deleteOne({ _id: req.params.id })
    res.send({
      success: true
    })
  })

  router.get('/:id', async (req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    res.send(serie)
  })

  router.put('/:id', async (req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id })
    serie.name = req.body.name
    serie.status = req.body.status
    try {
      await serie.save()
      res.send(serie)
    } catch (e) {
      res.send({
        success: false,
        errors: Object.keys(e.errors)
      })
    }
  })

module.exports = router