const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET || 'vegetaABC123'

const authAdmin = async (req, res, next)=>{
    const token = req.body.token || req.query.token  || req.headers['x-access-token']
    if(token){
      try{
        const payload = jwt.verify(token, jwtSecret)
        console.log(`Session iniated by user\n ${JSON.stringify(payload)}\n on ${new Date().toLocaleString('pt-BR')}` )
        if(payload.roles.indexOf('admin') >= 0){
         return  next()
        }else{
       return  res.send({
           success: false,
           message: 'user does not have permission to access the destination resource.'
          })
        }
      }catch (e){
         res.send({
           success: false,
           error: e.name,
           message: e.message
        })
      }
    }else{
      //se o token não existe
      return  res.send({
        success: false,
        message: 'there is not a valid token, or it was not sent'
       })
    }
 }

 module.exports = { authAdmin }