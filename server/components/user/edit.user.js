

const User = require('../../model/user')

const updateUserStatusProduct = async(req,res)=>{
    try {
        const body = req.body
         const product = await User.findByIdAndUpdate(req.params.id,body)
       res.send({
        success:true,
        message:'successfully updated'
    })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
       
}

module.exports = updateUserStatusProduct