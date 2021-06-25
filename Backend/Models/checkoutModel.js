const mongoose = require('mongoose');

const checkOutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    lineItems: [
      {
        _id: false,
        price_data: {
          currency: {
            type: String,
            default: 'usd',
          },
          product_data: {
            name: {
              type: String,
              required: true,
            },
            images: [String],
          },
          unit_amount_decimal: {
            type: Number,
            required: true,
          },
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    isPaid: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    totalamount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CheckOut = mongoose.model('checkout', checkOutSchema);
module.exports = CheckOut;
