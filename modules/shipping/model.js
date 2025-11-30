// modules/shipping/model.js

import mongoose from "mongoose";

const ShippingCompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    trackingUrl: { type: String },
    phone: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("ShippingCompany", ShippingCompanySchema);
