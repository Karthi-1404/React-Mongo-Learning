const mongoose = require('mongoose')
 const Productschema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:Number
    },
    age:{
        required:true,
        type:Number
    },
    price:{
        required:true,
        type:Number
    },
    category:{
        required:true,
        type:String
    },
    images:{
        required:true,
        type:Array,
        default:[]
    },
    billavailable:{
        type:Boolean,
        default:false
    },
    warrentyavailable:{
        type:Boolean,
        default:false
    },
    accessoriesavailable:{
        type:Boolean,
        default:false
    },
    boxavailable:{
        type:Boolean,
        default:false
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    status:{
        type:String,
        default:'pending',
        required:true
    }
    


 },{timestamps:true})

 const Products = mongoose.model('products',Productschema)
 module.exports = Products