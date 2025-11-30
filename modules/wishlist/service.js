// modules/wishlist/service.js

import Wishlist from "./model.js";
import Product from "../products/model.js";

export default {
  async getUserWishlist(userId) {
    let wishlist = await Wishlist.findOne({ user: userId })
      .populate("items.product");

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        items: [],
      });
    }

    return wishlist;
  },

  async addToWishlist(userId, productId) {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Ürün bulunamadı");

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        items: [],
      });
    }

    const exists = wishlist.items.find(
      (i) => i.product.toString() === productId.toString()
    );

    if (exists) {
      return wishlist; // zaten ekli, tekrar eklemeyelim
    }

    wishlist.items.push({
      product: productId,
    });

    await wishlist.save();
    return wishlist;
  },

  async removeFromWishlist(userId, productId) {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      throw new Error("Favori listesi bulunamadı");
    }

    wishlist.items = wishlist.items.filter(
      (i) => i.product.toString() !== productId.toString()
    );

    await wishlist.save();
    return wishlist;
  },

  async clearWishlist(userId) {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) return true;

    wishlist.items = [];
    await wishlist.save();

    return true;
  },
};
