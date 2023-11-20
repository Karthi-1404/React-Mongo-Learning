
const User = require('../../model/user')


const currentUser = async (req,res)=>{
    try {console.log('req.body.userId',req.body.userId);
        const currentuser =  await User.findById(req.body.userId)  
        if(currentuser){
            console.log('=====',{
                success:true,
                data:currentuser
             });
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
module.exports = currentUser