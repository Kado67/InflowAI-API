// modules/auth/controller.js

import * as AuthService from "./service.js";

export async function registerController(req, res, next) {
  try {
    const { name, email, password, phone } = req.body;

    const result = await AuthService.register({
      name,
      email,
      password,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Kayıt başarılı.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    const userAgent = req.headers["user-agent"];
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const result = await AuthService.login({
      email,
      password,
      userAgent,
      ip,
    });

    return res.json({
      success: true,
      message: "Giriş başarılı.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function logoutController(req, res, next) {
  try {
    const { refreshToken } = req.body;

    // Access token'dan kullanıcıyı bul
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    const payload = AuthService.verifyAccessToken(token);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Geçersiz erişim token.",
      });
    }

    await AuthService.logout(payload.sub, refreshToken);

    return res.json({
      success: true,
      message: "Çıkış yapıldı.",
    });
  } catch (err) {
    next(err);
  }
}

export async function refreshTokensController(req, res, next) {
  try {
    const { refreshToken } = req.body;

    const userAgent = req.headers["user-agent"];
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const result = await AuthService.refreshTokens(
      refreshToken,
      userAgent,
      ip
    );

    return res.json({
      success: true,
      message: "Tokenlar yenilendi.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function changePasswordController(req, res, next) {
  try {
    const { oldPassword, newPassword } = req.body;

    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    const payload = AuthService.verifyAccessToken(token);

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: "Geçersiz erişim token.",
      });
    }

    await AuthService.changePassword(payload.sub, oldPassword, newPassword);

    return res.json({
      success: true,
      message: "Şifre güncellendi.",
    });
  } catch (err) {
    next(err);
  }
      }
