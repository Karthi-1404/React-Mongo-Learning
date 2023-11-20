
const Products = require('../../model/productModel')
const Cloudinary = require('../../config/upload.image')


const addImage = async(req,res)=>{
    try {
        console.log('req.file',req.file);
        // const file = req.file
        const result = await Cloudinary.uploader.upload(req.file.path,{folder:'react-learning'})
        console.log('result',req.body.productId,result.secure_url);
        const product = await Products.findByIdAndUpdate(req.body.productId,{$push:{images:result.secure_url}})
       res.send({
        success:true,
        message:'image successfully Added',
        image:product.images
    })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        }) 
    }
       
}

module.exports = addImage