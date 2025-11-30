// modules/reviews/controller.js

import ReviewService from "./service.js";

export default {
  async create(req, res) {
    try {
      const review = await ReviewService.createReview(req.user.id, req.body);

      res.status(201).json({ success: true, review });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const review = await ReviewService.updateReview(
        req.user.id,
        req.params.id,
        req.body
      );

      res.json({ success: true, review });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await ReviewService.deleteReview(req.user.id, req.params.id);

      res.json({ success: true, message: "Yorum silindi" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async productReviews(req, res) {
    try {
      const reviews = await ReviewService.getProductReviews(req.params.productId);

      res.json({ success: true, reviews });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async myReviews(req, res) {
    try {
      const reviews = await ReviewService.getMyReviews(req.user.id);

      res.json({ success: true, reviews });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },
};
