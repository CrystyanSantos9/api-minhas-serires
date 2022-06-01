const express = require('express')
const app = express()
const cors = require('cors')

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');

//middlewares
//identificar formato de entrada de dados 
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
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
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", ["GET","POST", "PUT", "PATCH"])
    app.use(cors())
    next()
})

//ROTAS
const auth = require('./routes/auth')
const series = require('./routes/series')
const users = require('./routes/users')


//USANDO ROTAS
app.use('/auth', auth)
app.use('/series', series)
app.use('/users', users)

module.exports = app