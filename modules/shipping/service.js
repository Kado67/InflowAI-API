// modules/shipping/service.js

import ShippingCompany from "./model.js";
import Order from "../orders/model.js";

export default {
  async createCompany(data) {
    return await ShippingCompany.create(data);
  },

  async listCompanies() {
    return await ShippingCompany.find().sort({ createdAt: -1 });
  },

  async getCompany(id) {
    return await ShippingCompany.findById(id);
  },

  async updateCompany(id, data) {
    return await ShippingCompany.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteCompany(id) {
    return await ShippingCompany.findByIdAndDelete(id);
  },

  async assignShippingToOrder(orderId, data) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Sipariş bulunamadı");

    order.orderStatus = "shipped";
    order.shippingCompany = data.company;
    order.trackingNumber = data.trackingNumber;

    await order.save();

    return order;
  },
};
