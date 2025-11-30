// modules/auth/controller.js

const authService = require('./service');

function getClientInfo(req) {
  return {
    userAgent: req.headers['user-agent'],
    ip:
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket?.remoteAddress,
  };
}

async function register(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    const result = await authService.register({ name, email, password, phone });

    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const info = getClientInfo(req);

    const result = await authService.login({
      email,
      password,
      userAgent: info.userAgent,
      ip: info.ip,
    });

    return res.json({
      success: true,
      data: {
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
}

async function logout(req, res) {
  try {
    const refreshToken =
      req.body?.refreshToken ||
      req.headers['x-refresh-token'] ||
      req.cookies?.refreshToken;

    await authService.logout(req.user.id, refreshToken);

    return res.json({
      success: true,
      message: "Çıkış yapıldı.",
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
}

async function refreshTokens(req, res) {
  try {
    const refreshToken =
      req.body?.refreshToken ||
      req.headers['x-refresh-token'] ||
      req.cookies?.refreshToken;

    const info = getClientInfo(req);

    const result = await authService.refreshTokens(
      refreshToken,
      info.userAgent,
      info.ip
    );

    return res.json({
      success: true,
      data: {
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
}

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    await authService.changePassword(req.user.id, oldPassword, newPassword);

    return res.json({
      success: true,
      message: "Şifre güncellendi.",
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  changePassword,
};
