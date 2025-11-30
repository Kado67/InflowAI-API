// modules/payments/service.js

import Payment from "./model.js";
import Order from "../orders/model.js";

export default {
  async createPayment(userId, data) {
    const order = await Order.findById(data.orderId);
    if (!order) throw new Error("Sipariş bulunamadı");

    const payment = await Payment.create({
      user: userId,
      order: data.orderId,
      amount: order.totalAmount,
      method: data.method || "paytr",
      status: "pending",
    });

    return payment;
  },

  async markPaid(paymentId, transactionId) {
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new Error("Ödeme bulunamadı");

    payment.status = "paid";
    payment.transactionId = transactionId || payment.transactionId;
    payment.message = "Ödeme başarıyla tamamlandı";
    await payment.save();

    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "paid",
      isPaid: true,
    });

    return payment;
  },

  async markFailed(paymentId, message) {
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new Error("Ödeme bulunamadı");

    payment.status = "failed";
    payment.message = message;
    await payment.save();

    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "failed",
    });

    return payment;
  },

  async getPayment(id) {
    return await Payment.findById(id)
      .populate("user")
      .populate("order");
  },

  async listUserPayments(userId) {
    return await Payment.find({ user: userId })
      .populate("order")
      .sort({ createdAt: -1 });
  },

  async listAllPayments() {
    return await Payment.find()
      .populate("user")
      .populate("order")
      .sort({ createdAt: -1 });
  },
};
