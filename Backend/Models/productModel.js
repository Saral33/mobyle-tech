const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have name"],
    },
    mainImage: {
      type: String,
      required: [true, "Product must have image"],
    },
    colors: [
      {
        color: { type: String },
        image: { type: String },
      },
    ],
    version: [
      {
        version: { type: String },
        price: { type: String },
      },
    ],
    quantity: {
      type: Number,
      required: [true, "Product must have quantity"],
    },
    brand: {
      type: String,
      required: [true, "Product must have brand"],
    },
    sale: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    screen: {
      type: String,
      required: [true, "Product must have screen size"],
    },
    os: {
      type: String,
      required: [true, "Product must have os"],
    },
    ram: {
      type: String,
      required: [true, "Product must have brand"],
    },
    rearCamera: {
      type: String,
      required: [true, "Product must have rear camera"],
    },
    frontCamera: {
      type: String,
      required: [true, "Product must have front camera"],
    },
    description: {
      type: String,
      required: [true, "Product must have description"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
