const express = require('express')
const {getProducts, getBrands, getProductById, getProductName, getProductByName, createReviewProducts} = require('../controllers/productController')
const auth = require('../middleware/authMiddleware')
const router = express.Router();


router.get('/',getProducts )
router.get('/brands',getBrands)
router.get('/names',getProductName)
router.get('/:id',getProductById)
router.post('/review/:id', auth, createReviewProducts)
router.get('/search/:name',getProductByName)




module.exports = router

