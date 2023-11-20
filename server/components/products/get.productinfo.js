

const Products = require('../../model/productModel')

const getProductinfo = async(req,res)=>{
    try {
        console.log('req.params.id',req.params.id);
         const product = await Products.findById(req.params.id).populate('seller')
        
       res.send({
        success:true,
        message:'successfully fetched',
        product
    })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
       
}

module.exports = getProductinfo