const express = require('express')
const auth = require('../middleware/authMiddleware')
const router = express.Router()
const {saveCheckout,checkOutSession,getMyCheckOut} = require('../controllers/checkOutController')


router.post('/',auth,saveCheckout)
router.post('/payment/:id',auth,checkOutSession)
router.get('/mycheckout',auth,getMyCheckOut)

module.exports = router