

const Products = require('../../model/productModel')

const updateProduct = async(req,res)=>{
    try {
        const body = req.body
         const product = await Products.findByIdAndUpdate(req.params.id,body,{ new: true })
        console.log('sdcscsdc',product);
       res.send({
        success:true,
        message:'successfully updated',
        product:product
    })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
       
}

module.exports = updateProduct