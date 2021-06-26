const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/saralkarki/image/upload/v1621325634/MobiHub/Avatar/blank-profile-picture-973460__340_hueep7.png',
    },
    role: {
      type: String,
      enum: ['User', 'admin'],
      default: 'User',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    secretCode: {
      type: String,
    },
    resettoken: {
      type: String,
    },
    googleLogin: {
      secret: {
        type: String,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcyrpt.hash(this.password, 12);
  next();
});

userSchema.methods.generateToken = function (time) {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
  return token;
};

userSchema.methods.comparePassword = async function (
  userPassword,
  savedPassword
) {
  const isVerified = await bcyrpt.compare(userPassword, savedPassword);
  return isVerified;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
