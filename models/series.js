const { default: mongoose } = require("mongoose")

//definindo o tipo de dado que ficara dentro do array de comentários
const CommentSchema = mongoose.Schema({
    comment: String
})

//cria esquema = objeto para banco 
const SeriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    status: {
        type: String,
        enumvalues: ['to-watch', 'watching', 'watched']
    },
    comments: [String]
})

//criando o banco definindo o nome e o eschema dos dados
const Serie = mongoose.model('MinhasSeries', SeriesSchema)
// const Serie = mongoose.define('MinhasSeries', SeriesSchema)

module.exports = Serie