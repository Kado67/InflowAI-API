// modules/products/routes.js

const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { verifyAccessToken } = require('../auth/service');

// auth middleware
function requireAuth(req, res, next) {
  const header = req.headers['authorization'];
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token yok.',
    });
  }

  const token = header.split(' ')[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: 'Token geçersiz.',
    });
  }

  req.user = { id: payload.sub, role: payload.role };
  next();
}

// 🔓 PUBLIC (müşteri tarafı)
router.get('/', controller.listProducts);
router.get('/:productId', controller.getProduct);

// 🔐 PROTECTED (satıcı / tedarikçi / admin kullanıcı)
// Burada tokeni olan herkes (rol kontrolünü controller içinde de yapabilirsin)
router.get('/me/list', requireAuth, controller.listSellerProducts);
router.post('/', requireAuth, controller.createProduct);
router.put('/:productId', requireAuth, controller.updateProduct);
router.delete('/:productId', requireAuth, controller.deleteProduct);

module.exports = router;
