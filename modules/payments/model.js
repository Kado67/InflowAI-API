// modules/payments/model.js

import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    amount: { type: Number, required: true },

    method: {
      type: String,
      enum: ["paytr", "credit_card", "eft", "cod"],
      default: "paytr",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    transactionId: { type: String }, // PayTR Sipariş ID
    message: { type: String },       // hata veya açıklama

  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
