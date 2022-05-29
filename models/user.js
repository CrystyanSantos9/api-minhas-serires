const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserShema = new mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    roles: [String]
})

UserShema.pre('save', function(next){
    let user = this 
    if(!user.isModified('password')) return next()
    bcrypt.genSalt((err, salt)=>{
        bcrypt.hash(user.password, salt, (err, hash)=>{
            user.password = hash 
            next()
        })
    })
})

UserShema.methods.checkPassword = function(password){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, this.password, (err, isMatch)=>{
            if(err){
                reject(err)
            }else{
                resolve(isMatch)
            }
        })
    })
}

const User = mongoose.model('User', UserShema)
module.exports = User 