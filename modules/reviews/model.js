// modules/reviews/model.js

import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },

    comment: { type: String, default: "" },

    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// bir kullanıcı aynı ürüne sadece 1 yorum yapabilir
ReviewSchema.index({ user: 1, product: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);
