// modules/auth/routes.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyAccessToken } = require('./service');

// Middleware
function requireAuth(req, res, next) {
  const header = req.headers['authorization'];

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: "Token bulunamadı.",
    });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Token geçersiz.",
    });
  }

  req.user = { id: payload.sub, role: payload.role };

  next();
}

// Public
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', controller.refreshTokens);

// Protected
router.post('/logout', requireAuth, controller.logout);
router.post('/change-password', requireAuth, controller.changePassword);

module.exports = router;
