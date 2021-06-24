const asyncHandler= require('express-async-handler')
const Product = require('../Models/productModel')

const getProducts = asyncHandler(async(req,res)=>{

    const brand = req.query.brand ? {brand: req.query.brand} : {}
    const page = Number(req.query.page) || 1
    const size = 4

    const totalProducts = await Product.find({})
    const products = await Product.find(brand).limit(size * page).sort({rating:-1})
    if(req.query.brand){
        const totalBrandProducts = await Product.find(brand)
        res.json({remaining:(totalBrandProducts.length - products.length <= 0 ? 0 : (totalBrandProducts.length - products.length)),products})
    }
    
    else{res.json({remaining:(totalProducts.length - products.length), products})}
})

const getProductById = asyncHandler(async(req,res)=>{

    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(404)
        throw new Error('No product found for given ID')
    }
    else{
        res.json(product)
    }
})



const getBrands = asyncHandler(async(req,res)=>{

    const products = await Product.find({})

    const brands = []

    products.map(product => brands.push({brand:product.brand, image: product.mainImage}))

    const result = Array.from(new Set(brands.map(a => a.brand))).map(brand => {
     return brands.find(a => a.brand === brand)
   })

   res.json(result)

})

const getProductName = asyncHandler(async(req,res)=>{

    const products = await Product.find({})

    const results = []

    products.map(product => results.push(product.name))

    res.json(results)
})

const getProductByName = asyncHandler(async(req,res)=>{
    const name = req.params.name
    const product = await Product.findOne({name})
    res.json(product._id)
})

const createReviewProducts = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    
    const {rating,review} = req.body
    if(!product){
        res.status(404)
        throw new Error('No product found for that id')
    }
    if(!rating || !review){
        throw new Error('Ratings and reviews both is required')
    }
    //Check if that product is already reviwed by user. If reviewed, mututae the array with new value
   const reviewdProduct = product.reviews.findIndex(pro => pro.user.toString()=== req.user.id)
   
   if(reviewdProduct>= 0){
       product.reviews[reviewdProduct].rating = Number(rating)
       product.reviews[reviewdProduct].review = review
       product.numReviews = product.reviews.length
       product.ratings = product.reviews.reduce((acc,item)=> item.rating + acc,0)/ product.reviews.length
       await product.save()
       res.json({'msg':'Successful'})
   }else{
       const reviewed = {
           name:req.user.username,
           rating: Number(rating),
           image:req.user.image,
           user:req.user.id,
           review
       }
       product.reviews.push(reviewed)
       product.numReviews = product.reviews.length
       product.ratings = product.reviews.reduce((acc,item)=> item.rating + acc,0)/ product.reviews.length
       await product.save()
       res.json({'msg':'Successful'})
    }
})



module.exports = {getProducts,getBrands,getProductById,getProductName,getProductByName,createReviewProducts}



