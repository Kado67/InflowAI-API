// modules/suppliers/model.js

import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },

    address: {
      country: { type: String, default: "Türkiye" },
      city: String,
      district: String,
      addressLine: String,
      postalCode: String,
    },

    apiKey: { type: String },  // Dropshipping API entegrasyonu için
    apiSecret: { type: String },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", SupplierSchema);
