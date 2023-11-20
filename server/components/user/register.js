const bcryptjs = require('bcryptjs')
const User = require('../../model/user')



const registerComponent = async(req,res)=>{
    try {
        const body = req.body
        console.log('body',body);
    const checkuser = await User.findOne({email:body.email})
    if(checkuser){
        throw new Error('user already Exit')
    } 
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(body.password,salt)
    body.password = hashedPassword
    console.log('after bosy',body);
      const result = await new User(body).save()
      if(!result)throw new Error('failed to create')
      res.send({
        success:true,
        message:'user created successfully',
        user:result
    }) 
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
    
}

module.exports = registerComponent