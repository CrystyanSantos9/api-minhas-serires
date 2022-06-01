const request = require('supertest') //faz request para nossa api usando o arquivo de definição
const app = require('../app') //definições da nossa aplicação 
const expect = require('chai').expect //usado para verificar o valor que esperamos no teste


const mongoose = require('mongoose')
const mongo = 'mongodb://172.19.0.2/test-api-minhas-series'

const User = require('../models/user')
const Serie = require('../models/series')

describe('Testando rest API', ()=>{
    before('connecting to mongodb', async () =>{
        //espera conectar
      await  mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
       await User.deleteMany({})
       const user = new User({
           username: 'teste',
           email: 'teste@local.com',
           password: '1234',
           roles: ["restrito"]
       })
       await user.save()
       await Serie.deleteMany({})
       return true 
    })
    it('should return error', done =>{
        request(app)
        .get('/series')
        .expect('Content-Type', /json/)
        .expect(403)
        .end((err, res)=>{
            expect(err).be.null 
            expect(res.body.success).be.false 
            done()
        })
    })
    it('should auth an user', done =>{
        request(app)
        .post('/auth')
        .send({
            email: 'teste@local.com',
            password: '1234'
        })
        .expect(200)
        .end((err, res)=>{
            expect(res.body.success).be.true
            expect(res.body.token).be.string
            done()
        })
    })
    it('should not auth an user', done =>{
        request(app)
        .post('/auth')
        .send({
            email: 'naoexiste@local.com',
            password: '1234'
        })
        .expect(200)
        .end((err, res)=>{
            expect(res.body.success).be.false 
            expect(res.body.message).be.string 
            done()
        })
    })
})