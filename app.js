// app.js
// InflowAI E-Ticaret API - Uygulama Tanımı

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const {
  featureConfig,
  buildSummary,
  listCategories,
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  previewOrder,
  createOrder,
  listOrders,
  getOrderById,
  updateOrder,
  analyzeMetrics,
} = require("./engine/ortakEngine");

const app = express();

// CORS
app.use(
  cors({
    origin: "*",
  })
);

// JSON body
app.use(express.json());

// Log
app.use(morgan("tiny"));

// -----------------------------
// Sağlık kontrolü
// -----------------------------
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "InflowAI E-Ticaret API",
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});

// -----------------------------
// Genel config / dashboard
// -----------------------------
app.get("/api/ecommerce/config", (req, res) => {
  res.json(featureConfig);
});

app.get("/api/ecommerce/dashboard", (req, res) => {
  const summary = buildSummary();
  res.json(summary);
});

// -----------------------------
// KATEGORİLER
// -----------------------------
app.get("/api/ecommerce/categories", (req, res) => {
  res.json(listCategories());
});

// -----------------------------
// ÜRÜNLER
// -----------------------------

// Liste
app.get("/api/ecommerce/products", (req, res) => {
  try {
    const {
      categoryId,
      q,
      minPrice,
      maxPrice,
      inStockOnly,
      status,
    } = req.query;

    const filters = {
      categoryId: categoryId ? Number(categoryId) : undefined,
      q: q || undefined,
      minPrice: typeof minPrice !== "undefined" ? Number(minPrice) : undefined,
      maxPrice: typeof maxPrice !== "undefined" ? Number(maxPrice) : undefined,
      inStockOnly: inStockOnly === "true" || inStockOnly === "1",
      status: status || undefined,
    };

    const products = listProducts(filters);
    res.json(products);
  } catch (err) {
    res.status(400).json({
      error:
        err && err.message
          ? err.message
          : "Ürünler listelenirken bir hata oluştu.",
    });
  }
});

// Tek ürün
app.get("/api/ecommerce/products/:id", (req, res) => {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Ürün bulunamadı." });
  }
  res.json(product);
});

// Ürün oluştur (şimdilik açık; ileride auth eklenir)
app.post("/api/ecommerce/products", (req, res) => {
  try {
    const product = createProduct(req.body || {});
    res.status(201).json(product);
  } catch (err) {
    res
      .status(400)
      .json({ error: err && err.message ? err.message : "Ürün eklenemedi." });
  }
});

// Ürün güncelle
app.patch("/api/ecommerce/products/:id", (req, res) => {
  try {
    const product = updateProduct(req.params.id, req.body || {});
    res.json(product);
  } catch (err) {
    res.status(400).json({
      error:
        err && err.message
          ? err.message
          : "Ürün güncellenirken bir hata oluştu.",
    });
  }
});

// Ürün sil
app.delete("/api/ecommerce/products/:id", (req, res) => {
  try {
    const removed = deleteProduct(req.params.id);
    res.json({ removed });
  } catch (err) {
    res.status(400).json({
      error:
        err && err.message
          ? err.message
          : "Ürün silinirken bir hata oluştu.",
    });
  }
});

// -----------------------------
// CHECKOUT & SİPARİŞ
// -----------------------------

// Ön izleme (stok düşmez)
app.post("/api/ecommerce/checkout/preview", (req, res) => {
  try {
    const preview = previewOrder(req.body || {});
    res.json(preview);
  } catch (err) {
    res.status(400).json({
      error:
        err && err.message
          ? err.message
          : "Ön izleme sırasında bir hata oluştu.",
    });
  }
});

// Sipariş oluştur (stok düşer, manuel kargo)
app.post("/api/ecommerce/checkout/confirm", (req, res) => {
  try {
    const order = createOrder(req.body || {});
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({
      error:
        err && err.message
          ? err.message
          : "Sipariş oluşturulurken bir hata oluştu.",
    });
  }
});

// Tüm siparişler (şimdilik herkese açık; ileride admin/satıcıya kısıtlanır)
app.get("/api/ecommerce/orders", (req, res) => {
  res.json(listOrders());
});

// Tek sipariş
app.get("/api/ecommerce/orders/:id", (req, res) => {
  const order = getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Sipariş bulunamadı." });
  }
  res.json(order);
});

// Sipariş güncelle (durum, takip no vs.)
app.patch("/api/ecommerce/orders/:id", (req, res) => {
  try {
    const order = updateOrder(req.params.id, req.body || {});
    res.json(order);
  } catch (err) {
    res.status(400).json({
      error:
        err && err.message
          ? err.message
          : "Sipariş güncellenirken bir hata oluştu.",
    });
  }
});

// -----------------------------
// Analiz
// -----------------------------
app.post("/api/ecommerce/analyze", (req, res) => {
  const metrics = analyzeMetrics();
  res.json(metrics);
});

module.exports = app;
