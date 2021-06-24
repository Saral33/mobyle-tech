const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'product'
    },
    image:{
        type:String,
        required:true
    },
    version:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    qty:{
        type: Number,
        default: 1
    }
})


const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    products:[productSchema]
    
})

const Cart = mongoose.model('cart',cartSchema)

module.exports = Cart