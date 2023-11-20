
const User = require('../../model/user')


const allUser = async (req,res)=>{
    try {
        const currentuser =  await User.find()  
        if(currentuser){
            res.send({
                success:true,
                data:currentuser
             })
        }else{
            throw new Error('No User Found')
        }
    } catch (error) {
         res.send({
            success:false,
            message:error.message
         })
    }
     
}
module.exports = allUser