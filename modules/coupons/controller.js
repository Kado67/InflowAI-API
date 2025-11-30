// modules/coupons/controller.js

import CouponService from "./service.js";

export default {
  async create(req, res) {
    try {
      const coupon = await CouponService.createCoupon(req.body);
      res.status(201).json({ success: true, coupon });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async list(req, res) {
    try {
      const coupons = await CouponService.getAllCoupons();
      res.json({ success: true, coupons });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async get(req, res) {
    try {
      const coupon = await CouponService.getCoupon(req.params.id);
      res.json({ success: true, coupon });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const coupon = await CouponService.updateCoupon(req.params.id, req.body);
      res.json({ success: true, coupon });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await CouponService.deleteCoupon(req.params.id);
      res.json({ success: true, message: "Kupon silindi" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async apply(req, res) {
    try {
      const { code, total } = req.body;

      const result = await CouponService.applyCoupon(
        req.user.id,
        code,
        total
      );

      res.json({ success: true, result });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
