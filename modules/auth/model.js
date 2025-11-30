// modules/auth/model.js
// Refresh token kayıtları

import mongoose from "mongoose";

const AuthTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    refreshToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    userAgent: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

const AuthToken = mongoose.model("AuthToken", AuthTokenSchema);

export default AuthToken;
