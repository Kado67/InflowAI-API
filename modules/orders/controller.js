// modules/orders/controller.js

import OrderService from "./service.js";

export default {
  async createOrder(req, res) {
    try {
      const order = await OrderService.createOrder(req.user.id, req.body);

      res.status(201).json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async getOrder(req, res) {
    try {
      const order = await OrderService.getOrder(
        req.params.id,
        req.user.id,
        req.user.role
      );

      res.json({ success: true, order });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async listMyOrders(req, res) {
    try {
      const orders = await OrderService.listUserOrders(req.user.id);
      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async updateStatus(req, res) {
    try {
      if (req.user.role !== "admin")
        return res.status(403).json({ success: false, message: "Yetkin yok" });

      const order = await OrderService.updateOrderStatus(
        req.params.id,
        req.body.status
      );

      res.json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async updatePayment(req, res) {
    try {
      if (req.user.role !== "admin")
        return res.status(403).json({ success: false, message: "Yetkin yok" });

      const order = await OrderService.setPaymentStatus(
        req.params.id,
        req.body.status
      );

      res.json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
