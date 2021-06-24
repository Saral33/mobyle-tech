const {
  getAllUsers,
  getAllCheckOuts,
  getDetails,
  loginAdmin,
  loadAdmin,
  getRecentCheckout,
  giveAdminPosition,
  approveCheckout,
  deleteProduct,
  getAllProducts,
  createProduct,
} = require('../controllers/adminController');
const admin = require('../middleware/adminMiddleware');
const auth = require('../middleware/authMiddleware');
const express = require('express');
const { uploadProductImage } = require('../controllers/uploadController');
const { multerUploads } = require('../middleware/multer');
const router = express.Router();

router.post('/adminlogin', loginAdmin);
router.post('/newproduct', auth, admin, createProduct);
router.post('/product-image', auth, admin, multerUploads, uploadProductImage);
router.get('/', auth, admin, loadAdmin);
router.get('/recent-checkout', auth, admin, getRecentCheckout);
router.get('/products', auth, admin, getAllProducts);
router.get('/userlist', auth, admin, getAllUsers);
router.get('/checkoutlist', auth, admin, getAllCheckOuts);
router.get('/stats', auth, admin, getDetails);
router.put('/role/:id', auth, admin, giveAdminPosition);
router.put('/approve-checkout/:id', auth, admin, approveCheckout);
router.delete('/product/:id', auth, admin, deleteProduct);

module.exports = router;
