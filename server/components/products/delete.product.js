

const Products = require('../../model/productModel')

const updateProduct = async(req,res)=>{
    try {
        const body = req.body
         const product = await Products.findByIdAndDelete(req.params.id)
       res.send({
        success:true,
        message:'successfully deleted'
    })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
       
}

module.exports = updateProduct