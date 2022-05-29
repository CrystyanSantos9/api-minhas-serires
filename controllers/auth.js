const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'vegetaABC123'

const auth =async ({User}, req, res)=>{
    const user = req.body
    const IsUserIndDB = await User.findOne({ email: user.email })
    if(!IsUserIndDB)  return   res.send({ success: false, message: 'user not found in user documents'})

    const isValid = await IsUserIndDB.checkPassword(user.password)
    if(isValid){
            const payload = {
                userId: IsUserIndDB._id,
                username: IsUserIndDB.name,
                roles: IsUserIndDB.roles,
            }
            jwt.sign(payload, jwtSecret, (err, token)=>{
                if(err) return  res.send({ success: false, message: err })

                return res.send({
                    success: true, 
                    token: token 
                })
            })
    }else{
        res.send({ success: false, message: 'wrong credentials, try again later...'})
    }
}

module.exports = { auth }