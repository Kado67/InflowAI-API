// modules/supplier/routes.js
const express = require("express");
const router = express.Router();

const { verifyAccessToken } = require("../auth/service");
const Product = require("../products/model");

// 🔐 Sadece supplier (veya admin) ürün ekleyebilir
function requireSupplier(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token yok." });
  }

  const token = header.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    return res.status(401).json({ success: false, message: "Token geçersiz." });
  }

  // Kullanıcı supplier değilse
  if (payload.role !== "supplier" && payload.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Bu işlem için izniniz yok." });
  }

  req.user = payload;
  next();
}

// ➤ ÜRÜN EKLE (POST /api/supplier/products)
router.post("/products", requireSupplier, async (req, res) => {
  try {
    const body = req.body;

    const product = await Product.create({
      name: body.name,
      slug: body.slug,
      price: body.price,
      oldPrice: body.oldPrice || null,
      stock: body.stock || 0,
      images: body.images || [],
      description: body.description || "",
      active: body.active !== false,
      supplier: req.user.sub, // ürünü ekleyen supplier
    });

    return res.json({ success: true, product });
  } catch (err) {
    console.error("Supplier ürün ekleme hatası:", err);
    return res
      .status(500)
      .json({ success: false, message: "Ürün eklenemedi." });
  }
});

// ➤ KENDİ ÜRÜNLERİNİ GETİR (GET /api/supplier/products)
router.get("/products", requireSupplier, async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.user.sub }).sort({
      createdAt: -1,
    });

    return res.json({ success: true, products });
  } catch (err) {
    console.error("Supplier ürün listeleme hatası:", err);
    return res
      .status(500)
      .json({ success: false, message: "Ürünler alınamadı." });
  }
});

// ➤ ÜRÜN SİL (DELETE /api/supplier/products/:id)
router.delete("/products/:id", requireSupplier, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      supplier: req.user.sub,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Ürün bulunamadı." });
    }

    await product.deleteOne();

    return res.json({ success: true, message: "Ürün silindi." });
  } catch (err) {
    console.error("Supplier ürün silme hatası:", err);
    return res
      .status(500)
      .json({ success: false, message: "Ürün silinemedi." });
  }
});

module.exports = router;
