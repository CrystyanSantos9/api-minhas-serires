//chama o objeto de criaçaõ do servidor
const express = require('express')
const app = express()
const { default: mongoose } = require('mongoose')
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

//USANDO ROTAS
app.use('/series', series)


//rota get - listagem 
app.get('/series', (req, res )=>{
    res.send(series)
})

//conectando o mongo
mongoose
    .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        //fazendo o servidor escutar após a conexão com o banco 
        app.listen(PORT, HOST, ()=> console.log('listening on ...'))
    })
    .catch( e => console.log(e))
