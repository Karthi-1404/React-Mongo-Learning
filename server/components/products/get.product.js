

const Products = require('../../model/productModel')

const getProduct = async(req,res)=>{
    try {
        console.log('req.body',req.body);
        let filter = {}
        if(req.body.seller){
            filter.seller = req.body.seller  
        }
        console.log('sdcscsdc',filter);
         const products = await Products.find(filter).populate('seller')
        
       res.send({
        success:true,
        message:'successfully fetched',
        products
    })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
       
}

module.exports = getProduct