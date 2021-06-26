const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const { activateAccountToken, passwordResetToken } = require('../config/email');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const bcrypt = require('bcryptjs');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExist = await User.findOne({ email });

  if (isUserExist && isUserExist.verified) {
    throw new Error(
      'User with this email already exist.You may have logged in with google'
    );
  }
  if (isUserExist && !isUserExist.verified) {
    throw new Error('Account need to be verified. Check your inbox mail');
  }

  const user = new User({ email, password, username });
  const token = await user.generateToken(600);
  user.secretCode = token;
  await user.save();
  activateAccountToken(user.email, user._id, token);
  res.json({
    message:
      'You need to activate your account. Activation Link has been sent to your email.',
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password, user.password))) {
    throw new Error('Invalid password or email');
  }

  if (!user.verified) {
    throw new Error('You have to activate your account. Check your inbox mail');
  }
  const token = await user.generateToken(3600 * 5);
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 * 5 });
  res.json({ message: 'Successfully login' });
});

const googleLoginUser = asyncHandler(async (req, res) => {
  const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);
  const { tokenId } = req.body;
  const verified = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email_verified, email, name, picture } = verified.payload;
  const password = email + process.env.SECRET_PASSWORD_USER;
  const hashedPassword = await bcrypt.hash(password, 12);

  if (email_verified) {
    const user = await User.findOne({ email });

    if (user && !user.googleLogin.status) {
      user.googleLogin.secret = hashedPassword;
      user.googleLogin.status = TransformStreamDefaultController;
      const token = await user.generateToken(3600);
      await user.save();
      res
        .cookie('token', token, { httpOnly: true, maxAge: 3600000 })
        .json({ message: 'Successfully login' });
    } else if (user && user.googleLogin.status) {
      const isMatch = await bcrypt.compare(password, user.googleLogin.secret);
      if (!isMatch) {
        throw new Error('Some auth Error in google Login');
      }
      const token = await user.generateToken(3600 * 5);
      res
        .cookie('token', token, { httpOnly: true, maxAge: 3600000 * 5 })
        .json({ message: 'Successfully login' });
    } else {
      const newUser = new User({
        email,
        username: name,
        password: hashedPassword,
        image: picture,
        verified: true,
      });
      newUser.googleLogin.secret = hashedPassword;
      newUser.googleLogin.status = true;
      const tokenForUser = await newUser.generateToken(3600 * 5);
      await newUser.save();
      res.cookie('token', tokenForUser, {
        httpOnly: true,
        maxAge: 3600000 * 5,
      });
      res.json({ message: 'Successfully login' });
    }
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    maxAge: 1,
  });
  res.json({
    message: 'Logout successful',
  });
});

const activateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const token = req.params.token;

  const user = await User.findById(id);

  if (!user) {
    throw new Error('Invalid link or user is deleted. Try registering again');
  }
  if (user.verified) {
    throw new Error(
      'User is already verified. You can login without any problem'
    );
  }

  if (!user.secretCode || user.secretCode !== token) {
    const newToken = await user.generateToken(600);
    user.secretCode = newToken;
    await user.save();
    activateAccountToken(user.email, user._id, newToken);
    throw new Error(
      'The link has expired. Link only last 10 minute.New link has been sent again'
    );
  }

  user.verified = true;
  user.secretCode = undefined;
  await user.save();
  res.json({
    message: 'Account Verified! You can now login',
  });
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('No user with this Email found');
  }
  const token = await user.generateToken(600);
  user.resettoken = token;
  await user.save();
  passwordResetToken(email, token, user._id);
  res.json({ msg: 'Reset link sent to this email' });
});

const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user.resettoken || user.resettoken !== req.params.token) {
    throw new Error('The token is expired or invalid token entered');
  }
  user.password = req.body.password;
  const tokenForUser = await newUser.generateToken(3600 * 5);

  res.cookie('token', tokenForUser, {
    httpOnly: true,
    maxAge: 3600000 * 5,
  });

  await user.save();
  res.json({ msg: 'Password reset successful' });
});

//To check if user is logged in or not
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id).select([
    '-password',
    '-verified',
    '-googleLogin',
  ]);
  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.id).select(['-verified']);
  const { email, username, password, newPassword, image } = req.body;

  if (password && newPassword) {
    if (await user.comparePassword(password, user.password)) {
      user.password = newPassword;
    } else {
      throw new Error('Old password isnot correct');
    }
  }
  if (email) {
    user.email = email;
  }
  if (username) {
    user.username = username;
  }
  if (image) {
    user.image = image;
  }
  await user.save();
  res.json({
    message: 'Successful',
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
  activateUser,
  logoutUser,
  updateUser,
  googleLoginUser,
  forgotPasswordRequest,
  resetPassword,
};
