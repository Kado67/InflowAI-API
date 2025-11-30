// modules/products/model.js
// ÜRÜN ŞEMASI

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true }, // URL için

    description: { type: String },

    // Kategori
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },

    // Ürünü ekleyen kullanıcı (satıcı / mağaza sahibi)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Tedarikçi (dropshipping tarafı için)
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: false,
    },

    price: { type: Number, required: true },
    currency: { type: String, default: 'TRY' },

    oldPrice: { type: Number }, // indirim öncesi fiyat
    stock: { type: Number, default: 0 },

    // Varyantlar (renk, beden vs.)
    variants: [
      {
        name: String, // Örn: Renk, Beden
        options: [String], // Örn: ["S", "M", "L"]
      },
    ],

    images: [{ type: String }], // resim URL listesi

    // Kargo bilgileri
    shippingTime: { type: String }, // Örn: "1-3 iş günü"
    shippingPrice: { type: Number, default: 0 },

    // Yorum / puan özeti
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Arama için index
ProductSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', ProductSchema);
