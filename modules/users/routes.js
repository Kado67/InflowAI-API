// modules/users/routes.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyAccessToken } = require('../auth/service');

// middleware
function requireAuth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Token yok.",
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

// ROUTES
router.get('/profile', requireAuth, controller.getProfile);
router.put('/profile', requireAuth, controller.updateProfile);

router.post('/addresses', requireAuth, controller.addAddress);
router.get('/addresses', requireAuth, controller.listAddresses);
router.put('/addresses/:addressId', requireAuth, controller.updateAddress);
router.delete('/addresses/:addressId', requireAuth, controller.deleteAddress);

module.exports = router;
