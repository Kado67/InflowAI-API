// modules/payments/controller.js

import PaymentService from "./service.js";

export default {
  async create(req, res) {
    try {
      const payment = await PaymentService.createPayment(req.user.id, req.body);

      res.status(201).json({
        success: true,
        payment,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  },

  async get(req, res) {
    try {
      const payment = await PaymentService.getPayment(req.params.id);

      res.json({
        success: true,
        payment,
      });
    } catch (err) {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    }
  },

  async myPayments(req, res) {
    try {
      const list = await PaymentService.listUserPayments(req.user.id);

      res.json({
        success: true,
        payments: list,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async allPayments(req, res) {
    try {
      if (req.user.role !== "admin")
        return res.status(403).json({ success: false, message: "Yetkin yok" });

      const list = await PaymentService.listAllPayments();

      res.json({
        success: true,
        payments: list,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async paySuccess(req, res) {
    try {
      const payment = await PaymentService.markPaid(
        req.body.paymentId,
        req.body.transactionId
      );

      res.json({ success: true, payment });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async payFail(req, res) {
    try {
      const payment = await PaymentService.markFailed(
        req.body.paymentId,
        req.body.message
      );

      res.json({ success: false, payment });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
