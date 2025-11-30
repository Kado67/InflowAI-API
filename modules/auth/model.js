// modules/auth/model.js
// Oturum / refresh token kayıtları

const mongoose = require('mongoose');

const AuthTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    userAgent: {
      type: String,
    },
    ip: {
      type: String,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// expiresAt zamanı gelince döküman otomatik silinsin
AuthTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('AuthToken', AuthTokenSchema);
