const mongoose = require('mongoose')


const UserShema = new mongoose.Schema({
    username: String,
    password: String,
    roles: [String]
})

const User = mongoose.model('User', UserShema)
module.exports = User 