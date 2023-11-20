

const Products = require('../../model/productModel')

const addProduct = async(req,res)=>{
    try {
        const body = req.body
        const product = await new Products(body).save()
        console.log('sdcscsdc',product);
       res.send({
        success:true,
        message:'successfully Added',
        product
    })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
       
}

module.exports = addProduct