// modules/auth/service.js
// Auth beyin – tüm iş mantığı burada

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthToken from "./model.js";
import User from "../users/model.js";

const ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_SECRET || "CHANGE_THIS_ACCESS_SECRET";

const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "CHANGE_THIS_REFRESH_SECRET";

const ACCESS_TOKEN_EXPIRES_IN =
  process.env.JWT_ACCESS_EXPIRES_IN || "15m";

const REFRESH_TOKEN_EXPIRES_IN =
  process.env.JWT_REFRESH_EXPIRES_IN || "30d";

// ------------------------------------------------------------------
//  Token oluşturucular
// ------------------------------------------------------------------

function signAccessToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
}

function signRefreshToken(user) {
  return jwt.sign(
    { sub: user._id.toString() },
    REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );
}

async function saveRefreshToken(userId, refreshToken, userAgent, ip) {
  const decoded = jwt.decode(refreshToken);
  const expiresAt = new Date(decoded.exp * 1000);

  return AuthToken.create({
    user: userId,
    refreshToken,
    expiresAt,
    userAgent,
    ip,
  });
}

// ------------------------------------------------------------------
//  Auth Servisleri
// ------------------------------------------------------------------

export async function register({ name, email, password, phone }) {
  const exist = await User.findOne({ email });
  if (exist) {
    const error = new Error("Bu e‑posta zaten kullanımda.");
    error.status = 400;
    throw error;
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashed,
    role: "user",
    isActive: true,
  });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  await saveRefreshToken(user._id, refreshToken);

  return { user, accessToken, refreshToken };
}

export async function login({ email, password, userAgent, ip }) {
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Kullanıcı bulunamadı.");
    error.status = 400;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error = new Error("Şifre hatalı.");
    error.status = 400;
    throw error;
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  await saveRefreshToken(user._id, refreshToken, userAgent, ip);

  user.lastLoginAt = new Date();
  await user.save();

  return { user, accessToken, refreshToken };
}

export async function logout(userId, refreshToken) {
  await AuthToken.deleteOne({ user: userId, refreshToken });
}

export async function refreshTokens(refreshToken, userAgent, ip) {
  if (!refreshToken) {
    const error = new Error("Refresh token eksik.");
    error.status = 400;
    throw error;
  }

  let payload;
  try {
    payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  } catch (err) {
    const error = new Error("Refresh token geçersiz.");
    error.status = 401;
    throw error;
  }

  const tokenDoc = await AuthToken.findOne({ refreshToken }).populate("user");

  if (!tokenDoc) {
    const error = new Error("Token kaydı yok.");
    error.status = 401;
    throw error;
  }

  const user = tokenDoc.user;

  await AuthToken.deleteOne({ _id: tokenDoc._id });

  const newAccess = signAccessToken(user);
  const newRefresh = signRefreshToken(user);

  await saveRefreshToken(user._id, newRefresh, userAgent, ip);

  return { user, accessToken: newAccess, refreshToken: newRefresh };
}

export async function changePassword(userId, oldPassword, newPassword) {
  const user = await User.findById(userId);

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) {
    const error = new Error("Eski şifre hatalı.");
    error.status = 400;
    throw error;
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  await AuthToken.deleteMany({ user: userId });

  return true;
}

export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch {
    return null;
  }
}

export default {
  register,
  login,
  logout,
  refreshTokens,
  changePassword,
  verifyAccessToken,
};
