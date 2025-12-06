// modules/users/model.js

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Genel bilgiler
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: { type: String },

    password: { type: String, required: true },

    // Rol sistemi: müşteri, tedarikçi, admin
    role: {
      type: String,
      enum: ["user", "admin", "supplier"],
      default: "user",
    },

    // Hesap durumu (özellikle tedarikçi onayı için)
    // pending  → mağaza başvurusu yapılmış, admin onayı bekliyor
    // active   → giriş yapabilir
    // blocked  → engelli / kapatılmış
    status: {
      type: String,
      enum: ["pending", "active", "blocked"],
      default: "active",
    },

    // Mağaza bilgileri (tedarikçi için)
    storeName: { type: String },
    website: { type: String },

    // Şifre sıfırlama alanları
    resetToken: { type: String },
    resetTokenExpires: { type: Date },

    // Diğer durum alanları
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

// Overwrite hatasını engellemek için:
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
