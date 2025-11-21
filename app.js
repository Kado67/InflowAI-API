// app.js
// =========================================
// InflowAI API - Ana Uygulama
// =========================================

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {
  analyzeMetrics,
  buildSummary,
  featureConfig,
} = require("./engine/ortakEngine");

const app = express();

// CORS (UI bağlanabilsin diye)
app.use(cors({ origin: "*" }));

// JSON desteği
app.use(express.json());

// Log
app.use(morgan("tiny"));

// ===== Sağlık kontrolü =====
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "InflowAI API aktif",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Status
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "InflowAI API durumu",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Öz summary
app.get("/api/ortak/summary", (req, res) => {
  res.json({
    status: "ok",
    data: buildSummary(),
    checkedAt: new Date().toISOString(),
  });
});

// UI -> API analiz
app.post("/api/ortak/analyze", (req, res) => {
  const metrics = req.body || {};
  res.json({
    status: "ok",
    data: analyzeMetrics(metrics),
    received: metrics,
  });
});

// Özellik listesi
app.get("/api/ortak/features", (req, res) => {
  res.json({
    status: "ok",
    data: featureConfig,
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint bulunamadı",
    path: req.originalUrl,
  });
});

module.exports = app;
