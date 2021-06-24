const express = require('express')
const {registerUser, loginUser, getUser, activateUser, logoutUser, updateUser, googleLoginUser} = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')
const {uploadImage} = require('../controllers/uploadController')
const router = express.Router()
const {multerUploads} = require('../middleware/multer')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/google-login',googleLoginUser)
router.get('/verify/:id/:token',activateUser)
router.get('/auth',auth,getUser)
router.get('/logout',auth,logoutUser)
router.put('/profile',auth,updateUser)
router.post('/upload/avatar',auth,multerUploads,uploadImage)


module.exports = router