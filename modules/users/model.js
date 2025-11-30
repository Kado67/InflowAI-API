// modules/users/model.js

const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Ev, iş, vb
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, default: "Türkiye" },
    city: { type: String, required: true },
    district: { type: String, required: true },
    addressLine: { type: String, required: true },
    postalCode: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "seller", "supplier", "admin"],
      default: "user",
    },

    addresses: [AddressSchema],

    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
