// modules/coupons/service.js

import Coupon from "./model.js";

export default {
  async createCoupon(data) {
    data.code = data.code.toUpperCase();

    const exists = await Coupon.findOne({ code: data.code });
    if (exists) throw new Error("Bu kupon kodu zaten var.");

    return await Coupon.create(data);
  },

  async getAllCoupons() {
    return await Coupon.find().sort({ createdAt: -1 });
  },

  async getCoupon(id) {
    return await Coupon.findById(id);
  },

  async updateCoupon(id, data) {
    if (data.code) data.code = data.code.toUpperCase();
    return await Coupon.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteCoupon(id) {
    return await Coupon.findByIdAndDelete(id);
  },

  async applyCoupon(userId, code, cartTotal) {
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) throw new Error("Kupon bulunamadı.");

    const now = new Date();
    if (now < coupon.startDate || now > coupon.endDate)
      throw new Error("Kupon geçerli değil.");

    if (cartTotal < coupon.minOrderAmount)
      throw new Error(`Minimum sepet tutarı: ${coupon.minOrderAmount} TL`);

    // toplam kullanım limiti
    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit)
      throw new Error("Kupon kullanım limiti doldu.");

    // kullanıcı bazlı kullanım
    const usedByUser = coupon.usedBy.find(
      (u) => u.user.toString() === userId.toString()
    );

    if (usedByUser && usedByUser.count >= coupon.perUserLimit)
      throw new Error("Bu kuponu daha fazla kullanamazsın.");

    // indirim hesapla
    let discount = 0;

    if (coupon.type === "percent") {
      discount = (cartTotal * coupon.value) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount)
        discount = coupon.maxDiscount;
    } else {
      discount = coupon.value;
    }

    const newTotal = cartTotal - discount;

    return {
      coupon: coupon.code,
      discount,
      total: newTotal,
    };
  },
};
