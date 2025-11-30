// modules/reviews/service.js

import Review from "./model.js";
import Product from "../products/model.js";

export default {
  async createReview(userId, data) {
    const { productId, rating, comment } = data;

    const product = await Product.findById(productId);
    if (!product) throw new Error("Ürün bulunamadı");

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await this.updateProductRating(productId);

    return review;
  },

  async updateReview(userId, id, data) {
    const review = await Review.findById(id);

    if (!review) throw new Error("Yorum bulunamadı");
    if (review.user.toString() !== userId.toString())
      throw new Error("Bu yorumu güncelleyemezsin");

    if (data.rating) review.rating = data.rating;
    if (data.comment) review.comment = data.comment;

    await review.save();
    await this.updateProductRating(review.product);

    return review;
  },

  async deleteReview(userId, id) {
    const review = await Review.findById(id);

    if (!review) throw new Error("Yorum bulunamadı");
    if (review.user.toString() !== userId.toString())
      throw new Error("Bu yorumu silemezsin");

    await review.deleteOne();
    await this.updateProductRating(review.product);

    return true;
  },

  async getProductReviews(productId) {
    return await Review.find({ product: productId })
      .populate("user")
      .sort({ createdAt: -1 });
  },

  async getMyReviews(userId) {
    return await Review.find({ user: userId })
      .populate("product")
      .sort({ createdAt: -1 });
  },

  async updateProductRating(productId) {
    const reviews = await Review.find({ product: productId });

    const total = reviews.length;
    const avg =
      total === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.rating, 0) / total;

    await Product.findByIdAndUpdate(productId, {
      averageRating: avg,
      ratingCount: total,
    });
  },
};
