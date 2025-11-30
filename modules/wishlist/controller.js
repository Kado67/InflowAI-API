// modules/wishlist/controller.js

import WishlistService from "./service.js";

export default {
  async getMyWishlist(req, res) {
    try {
      const wishlist = await WishlistService.getUserWishlist(req.user.id);

      res.json({
        success: true,
        data: wishlist,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async add(req, res) {
    try {
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "productId zorunlu",
        });
      }

      const wishlist = await WishlistService.addToWishlist(
        req.user.id,
        productId
      );

      res.json({
        success: true,
        data: wishlist,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  },

  async remove(req, res) {
    try {
      const { productId } = req.params;

      const wishlist = await WishlistService.removeFromWishlist(
        req.user.id,
        productId
      );

      res.json({
        success: true,
        data: wishlist,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  },

  async clear(req, res) {
    try {
      await WishlistService.clearWishlist(req.user.id);

      res.json({
        success: true,
        message: "Favori listen temizlendi",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },
};
