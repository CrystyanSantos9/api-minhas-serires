//chama o objeto de criaçaõ do servidor

const { default: mongoose } = require('mongoose')

const app = require('./app')

//MODELS
const User = require('./models/user')

//em versõs mais antigas 
//mongoose.Promise = global.Promise 

//variaveis de ambiente porta e endereço servidor
const PORT = process.env.PORT || 3005
const HOST = process.env.HOST ||  '0.0.0.0'
//definindo url do mongo
// const mongo = process.env.MONGO || 'mongodb://localhost/api-minhas-series'
const mongo = process.env.MONGO || 'mongodb://172.19.0.2/api-minhas-series'

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
        app.listen(PORT, HOST, ()=> console.log(`Listening on ${PORT}`))
    })
    .catch( e => console.log(e))
