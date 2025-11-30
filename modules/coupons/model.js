// modules/coupons/model.js

import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["percent", "fixed"],
      default: "percent",
    },

    value: {
      type: Number,
      required: true,
    },

    minOrderAmount: {
      type: Number,
      default: 0,
    },

    maxDiscount: {
      type: Number,
      default: null,
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    usageLimit: { type: Number, default: 0 }, // 0 = limitsiz
    usedCount: { type: Number, default: 0 },

    perUserLimit: { type: Number, default: 1 },

    usedBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        count: { type: Number, default: 0 },
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", CouponSchema);
