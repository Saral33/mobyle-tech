const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const Product = require('../Models/productModel');
const CheckOut = require('../Models/checkoutModel');

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password, code } = req.body;
  if (!email || !password || !code) {
    throw new Error('Every field is required');
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new Error('Invalid password or email');
  }
  if (user.role !== 'admin') {
    throw new Error('You arenot admin');
  }
  if (code !== process.env.ADMIN_SECRET_key) {
    throw new Error('Invalid code');
  }

  const token = await user.generateToken(3600 * 5);
  res
    .status(200)
    .cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000 * 5,
      secure: true,
      sameSite: 'none',
    })
    .json({ msg: 'Welcome admin' });
});

const loadAdmin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select([
      '-password',
      '-verified',
      '-googleLogin',
    ]);
    res.json(user);
  } catch (error) {
    res.json(error.response);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select([
    '-password',
    '-verified',
    '-secretCode',
    '-googleLogin',
  ]);
  res.json({ users });
});

const getAllCheckOuts = asyncHandler(async (req, res) => {
  const checkOuts = await CheckOut.find({}).sort('-createdAt');
  res.json(checkOuts);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  const page = Math.ceil(products.length / 10);
  res.json({ page, products });
});

const getDetails = asyncHandler(async (req, res) => {
  const totalUsers = (await User.find({})).length;
  const totalProducts = (await Product.find({})).length;
  const totalCheckouts = (await CheckOut.find({})).length;

  res.json({
    totalCheckouts,
    totalUsers,
    totalProducts,
  });
});

const getRecentCheckout = asyncHandler(async (req, res) => {
  const checkOut = await CheckOut.find({})
    .select('lineItems')
    .sort('-createdAt')
    .limit(3);
  let lineItem = [];
  checkOut.map((c) => lineItem.push(c.lineItems));
  const result = lineItem.flat().slice(0, 3); //only 3 results send as response

  res.json(result);
});

const giveAdminPosition = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new Error('No user found for this ID');
  }

  user.role = 'admin';
  await user.save();
  res.json({ msg: 'Role Changed successfully' });
});

const approveCheckout = asyncHandler(async (req, res) => {
  const checkOut = await CheckOut.findById(req.params.id);
  if (!checkOut) {
    throw new Error('No checkout found for this ID');
  }
  checkOut.isApproved = true;
  await checkOut.save();
  res.json({ msg: 'Approved succesfully' });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  await product.save();
  res.json({ msg: 'Deleted Successfully' });
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    mainImage,
    brand,
    colors,
    version,
    quantity,
    screen,
    os,
    ram,
    rearCamera,
    frontCamera,
    description,
  } = req.body;

  const product = new Product({
    name,
    mainImage,
    brand,
    colors,
    version,
    quantity,
    screen,
    os,
    ram,
    rearCamera,
    frontCamera,
    description,
  });
  await product.save();
  res.json({ msg: 'Product Created successfully' });
});

module.exports = {
  getAllUsers,
  deleteProduct,
  getAllCheckOuts,
  getDetails,
  loginAdmin,
  loadAdmin,
  getRecentCheckout,
  giveAdminPosition,
  approveCheckout,
  getAllProducts,
  createProduct,
};
