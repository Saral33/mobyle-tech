const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const auth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error('No cookie Found. Please Log in again');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('User not found or token expired');
  }
  if (!user.verified) {
    throw new Error('This user isnot verified');
  }

  req.user = user;
  req.id = decoded.id;
  next();
});

module.exports = auth;
