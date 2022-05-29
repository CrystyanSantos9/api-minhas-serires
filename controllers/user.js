const validations = require('../utils/validations')

const list =  async ( {User}, req, res)=>{
    const users = await User.find({})
    res.send(users)
}



const create =  async ( {User}, req, res)=>{
    const {username, password, email, roles} = req.body
    if(!validations.isEmpty(username) && !validations.isEmpty(password) && !validations.isEmpty(email)){
        try{
            const user = new User({
                username,
                email,
                password, 
                roles
            })
          await user.save()
          return  res.send({
                success: true,
                message: "user created succesfull",
                dataCretead: user
            })
        }catch(e){
            return res.send({
                success: "false",
                message: e,
                dataSent: req.body
            })
        }
    }
    res.send({
        success: "false",
        message: "values of username and password is empty.",
        dataSent: req.body
    })
}

const removeAllDocuments = async ({User}, req, res)=>{
    const hasDocuments = await User.count({})
    console.log(hasDocuments)
    try{
        if(hasDocuments === 0){
            return res.send({
                success: false,
                message: "theres is not any documents in user collection"
            })
        }
            await User.deleteMany({})
            return  res.send({
                 success: true,
                 message: "all documents removed.",
            })
    }catch(e){
        res.send({
            success: false,
            message: e
        })
    } 
}

module.exports = {
    list, 
    create,
    removeAllDocuments
}