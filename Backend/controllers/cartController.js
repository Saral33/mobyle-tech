const Cart = require('../Models/cartModel');
const Product = require('../Models/productModel');
const asyncHandler = require('express-async-handler');

const addToCart = asyncHandler(async (req, res) => {
  const { image, version, price } = req.body;
  const isCart = await Cart.findOne({ user: req.user.id });
  if (isCart) {
    const isProduct = isCart.products.findIndex(
      (pro) => pro.product.toString() === req.params.id
    );
    if (isProduct >= 0) {
      isCart.products[isProduct].qty = isCart.products[isProduct].qty + 1;
      await isCart.save();
      res.json({ msg: 'Added Successfully' });
    } else {
      const product = await Product.findById(req.params.id);
      const newProduct = {
        product: req.params.id,
        image,
        version,
        price,
        name: product.name,
      };
      isCart.products.push(newProduct);
      await isCart.save();
      res.json({ msg: 'Added Successfully' });
    }
  } else {
    const product = await Product.findById(req.params.id);
    const resultProduct = [];
    resultProduct.push({
      product: req.params.id,
      image,
      version,
      price,
      name: product.name,
    });
    const newCart = new Cart({
      user: req.user.id,
      products: resultProduct,
    });
    await newCart.save();
    res.json({ msg: 'Added Successfully' });
  }
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    throw new Error('No cart found for the user');
  }
  res.json(cart);
});

const deleteFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  const newProduct = cart.products.filter(
    (pro) => pro.product.toString() !== req.params.id
  );
  cart.products = newProduct;
  await cart.save();
  res.json({ msg: 'Deleted Successfully' });
});

const deleteAllFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  cart.products = [];
  await cart.save();
  res.json({ msg: 'Deleted Successfully' });
});

module.exports = { addToCart, getCart, deleteFromCart, deleteAllFromCart };
