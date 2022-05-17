//chama o objeto de criaçaõ do servidor
const express = require('express')
const app = express()
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'vegetaABC123'
const User = require('./models/user')


//em versõs mais antigas 
//mongoose.Promise = global.Promise 

//variaveis de ambiente porta e endereço servidor
const PORT = process.env.PORT || 3005
const HOST = process.env.HOST ||  '0.0.0.0'
//definindo url do mongo
// const mongo = process.env.MONGO || 'mongodb://localhost/api-minhas-series'
const mongo = process.env.MONGO || 'mongodb://172.19.0.2/api-minhas-series'

//middlewares
//identificar formato de entrada de dados 
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//ROTAS
const series = require('./routes/series')
const users = require('./routes/users')

//USANDO ROTAS
app.use('/series', series)
app.use('/users', users)

app.post('/auth', async(req, res)=>{
    const user = req.body
    const IsUserIndDB = await User.findOne({username: user.username })
    if(IsUserIndDB){
        if(IsUserIndDB.password === user.password){
            const payload = {
                userId: IsUserIndDB._id,
                username: IsUserIndDB.name,
                roles: IsUserIndDB.roles,
            }
            jwt.sign(payload, jwtSecret, (err, token)=>{
                res.send({
                    success: true, 
                    token: token 
                })
            })
        }else{
            res.send({ success: false, message: 'wrong credentials, try again later...'})
        }
    }else{
        res.send({ success: false, message: 'wrong credentials, try again later...'})
    }
})

//Usuários iniciais para lidar do mongodb 
const createInitialUsers = async ()=>{
    //retorna a quantidade de usuários existentes nesse banco de dados
    const total = await User.count({})
    if(total === 0){
        const user = new User({
            username: 'admin', 
            password: '123456',
            roles: ['restrito', 'admin']
        })
        await user.save()

        const user2 = new User({
            username: 'restrito', 
            password: '123456',
            roles: ['restrito']
        })
        await user2.save()
    }
}

//conectando o mongo
mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        //criando usuarios
        createInitialUsers()
        //fazendo o servidor escutar após a conexão com o banco 
        app.listen(PORT, HOST, ()=> console.log('listening on ...'))
    })
    .catch( e => console.log(e))
