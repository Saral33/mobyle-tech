const express = require('express')
const auth = require('../middleware/authMiddleware')
const router = express.Router()
const {getCart,addToCart, deleteFromCart,deleteAllFromCart} = require('../controllers/cartController')


router.get('/',auth,getCart)
router.delete('/',auth,deleteAllFromCart)
router.post('/:id',auth,addToCart)
router.delete('/:id',auth,deleteFromCart)

module.exports = router