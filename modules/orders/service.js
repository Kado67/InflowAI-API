// modules/orders/service.js

import Order from "./model.js";
import Product from "../products/model.js";

export default {
  async createOrder(userId, data) {
    const items = [];

    for (const item of data.items) {
      const product = await Product.findById(item.product);

      if (!product) throw new Error("Ürün bulunamadı");

      items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || "",
      });

      // stok düş
      if (product.stock < item.quantity) {
        throw new Error("Stok yetersiz");
      }

      product.stock -= item.quantity;
      await product.save();
    }

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      shippingAddress: data.shippingAddress,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    return order;
  },

  async getOrder(id, userId, role) {
    const order = await Order.findById(id)
      .populate("user")
      .populate("items.product");

    if (!order) throw new Error("Sipariş bulunamadı");

    // Admin her şeyi görür
    if (role !== "admin" && order.user._id.toString() !== userId.toString()) {
      throw new Error("Bu siparişi görme yetkin yok");
    }

    return order;
  },

  async listUserOrders(userId) {
    return await Order.find({ user: userId }).sort({ createdAt: -1 });
  },

  async updateOrderStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
  },

  async setPaymentStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { paymentStatus: status }, { new: true });
  },
};
