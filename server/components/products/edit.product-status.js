

const Products = require('../../model/productModel')

const updateStatusProduct = async(req,res)=>{
    try {
        const body = req.body
         const product = await Products.findByIdAndUpdate(req.params.id,body)
        console.log('sdcscsdc',product);
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

module.exports = updateStatusProduct