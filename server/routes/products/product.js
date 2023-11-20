const router = require('express').Router()
const Authmiddleware = require('../../middleware/Auth.middleware')
const addProductComponent = require('../../components/products/add.product')
const getProductComponent = require('../../components/products/get.product')
const getProductByIDComponent = require('../../components/products/get.productinfo')
const editProductComponent = require('../../components/products/edit.product')
const editProductStatusComponent = require('../../components/products/edit.product-status')
const deleteProductComponent = require('../../components/products/delete.product')
const uploadImageComponent = require('../../components/products/upload.product')
const multer = require('multer')
const storage = multer.diskStorage({
    filename:function (req,file,callback){
        callback(null,Date.now()+file.originalname)
    }
})
console.log('storage',storage);
router.post('/add',Authmiddleware,addProductComponent)
router.post('/get-product',Authmiddleware,getProductComponent)
router.get('/get-product-id/:id',Authmiddleware,getProductByIDComponent)
router.put('/edit-product/:id',Authmiddleware,editProductComponent)
router.put('/edit-product-status/:id',Authmiddleware,editProductStatusComponent)
router.delete('/delete-product/:id',Authmiddleware,deleteProductComponent)
router.post('/add-image',Authmiddleware,multer({ storage: storage }).single('file') ,uploadImageComponent)

module.exports = router