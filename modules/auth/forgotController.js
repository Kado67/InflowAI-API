// modules/auth/forgotController.js
import User from "../users/model.js";
import crypto from "crypto";

export async function forgotPassword(req, res) {
  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "E‑posta zorunludur",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      success: true,
      message: "Eğer bu e‑posta kayıtlıysa talep alındı",
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 30 * 60 * 1000;
  await user.save();

  return res.json({
    success: true,
    message: "Sıfırlama talebi oluşturuldu",
    token, // TEST ortamında geri döndürüyoruz
  });
}
