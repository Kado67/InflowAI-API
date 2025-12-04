// modules/products/model.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },

    price: { type: Number, required: true },
    currency: { type: String, default: "TRY" },

    oldPrice: Number,
    stock: { type: Number, default: 0 },

    variants: [
      {
        name: String,
        options: [String],
      },
    ],

    images: [String],

    shippingTime: String,
    shippingPrice: { type: Number, default: 0 },

    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;   // 🔥 ESM DEĞİL → COMMONJS
