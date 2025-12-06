// modules/auth/resetController.js
import User from "../users/model.js";
import bcrypt from "bcryptjs";

export async function resetPassword(req, res) {
  const { token, password } = req.body || {};

  // 1) Zorunlu alan kontrolü
  if (!token || !password) {
    return res.status(400).json({
      success: false,
      message: "Token ve yeni şifre zorunludur",
    });
  }

  // 2) Token geçerli mi, süresi dolmamış mı?
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Token geçersiz veya süresi dolmuş",
    });
  }

  // 3) Yeni şifreyi hashle ve kaydet
  const hashed = await bcrypt.hash(password, 10);
  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  await user.save();

  // 4) Başarılı cevap
  res.json({
    success: true,
    message: "Şifre başarıyla yenilendi",
  });
}
