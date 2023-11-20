const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../model/user')



const loginComponent = async(req,res)=>{
    try {
        const body = req.body
        console.log('body',body);
    const checkuser = await User.findOne({email:body.email})
    if(!checkuser){
        throw new Error('user not exit')
    }
    if(checkuser.status != 'active'){
        throw new Error('user is not active')
    }  
    const valid = await bcryptjs.compare(body.password,checkuser.password)
    if(!valid){
        throw new Error('credential is invalid') 
    }
     const token = jwt.sign({userId:checkuser._id}, process.env.secret_key)
      res.send({
        success:true,
        message:'successfully Logged IN',
        user:{
            checkuser,
            token
        }
    }) 
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
    
}

module.exports = loginComponent