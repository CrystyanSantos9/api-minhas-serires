//chama o objeto de criaçaõ do servidor
const express = require('express')
const app = express()
const { default: mongoose } = require('mongoose')


const cors = require('cors')

//Model
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
// app.use(cors())
// app.use(cors({
//     origin: (origin, calback)=>{
//         if(origin === 'http://server2:8080'){
//             calback(null, true)
//         }else{
//             calback(new Error('Origin not allowed by cors'))
//         }
//     },
// }))
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://server2:8080")
    res.header("Access-Control-Allow-Methods", "PUT")
    app.use(cors())
    next()
})

//ROTAS
const auth = require('./routes/auth')
const series = require('./routes/series')
const users = require('./routes/users')
const { application } = require('express')

//USANDO ROTAS
app.use('/auth', auth)
app.use('/series', series)
app.use('/users', users)

//Usuários iniciais para lidar do mongodb 
const createInitialUsers = async ()=>{
    //retorna a quantidade de usuários existentes nesse banco de dados
    const total = await User.count({})
    if(total === 0){
        const user = new User({
            username: 'admin', 
            email: 'admin@local.com', 
            password: '123456',
            roles: ['restrito', 'admin']
        })

        await user.save()

        const user2 = new User({
            username: 'restrito', 
            email: 'restrito@local.com', 
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
