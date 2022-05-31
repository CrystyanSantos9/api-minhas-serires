const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'vegetaABC123'

const Serie = require('../models/series')

router.use(async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    try {
      const payload = jwt.verify(token, jwtSecret)
      console.log(payload)
      if (payload.roles.indexOf('restrito') >= 0) {
        next()
      } else {
        res.statusCode = 401
        res.send({
          success: false,
          message: 'user does not have permission to access the destination resource'
        })
      }
    } catch (e) {
      res.statusCode = 501
      res.send({
        success: false,
        message: 'request not processed'
      })
    }
  } else {
    res.statusCode = 403
    res.send({
      success: false,
      message: 'there is not a header or field with a valid token'
    })
  }
})

//será a rota principal do recurso /series 
//que vamos definir dentro do módulo server
router.get('/', async (req, res) => {
  const series = await Serie.find({})
  res.send(series)
})

router.post('/', async (req, res) => {
  const serie = new Serie(req.body)
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