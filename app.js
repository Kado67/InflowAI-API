// app.js
// =========================================
// InflowAI API - Uygulama tanımı
// Ortak motoru ve genel endpoint'ler
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

// Orijin kısıtlamasını şimdilik serbest bırakıyoruz
app.use(
  cors({
    origin: "*",
  })
);

// JSON body desteği
app.use(express.json());

// Basit log
app.use(morgan("tiny"));

// Küçük sağlık kontrolü – UI ve Render logları için
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "InflowAI API aktif",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Aynı bilgiyi /api/status üzerinden de ver
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    message: "InflowAI API durumu",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Ortak genel özeti
app.get("/api/ortak/summary", (req, res) => {
  const summary = buildSummary();

  res.json({
    status: "ok",
    data: summary,
    checkedAt: new Date().toISOString(),
  });
});

// Ortak analiz endpoint'i – UI gerçek metrik gönderdiğinde
app.post("/api/ortak/analyze", (req, res) => {
  const inputMetrics = req.body || {};
  const analysis = analyzeMetrics(inputMetrics);

  res.json({
    status: "ok",
    data: analysis,
    receivedMetrics: inputMetrics,
  });
});

// Ortak görev ve özellik listesi – komut haritası için
// UI'nin beklediği format engine tarafından hazır geliyor
app.get("/api/ortak/features", (req, res) => {
  res.json({
    status: "ok",
    data: featureConfig,
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint bulunamadı.",
    path: req.originalUrl,
  });
});

module.exports = app;
```0
