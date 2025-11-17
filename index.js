// ==========================================
// InflowAI API – Çalışan Sürüm
// ==========================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;

// JSON body desteği
app.use(express.json());

// ROOT endpoint – Kontrol Merkezi Burayı Test Ediyor
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "InflowAI API aktif",
    uptime: process.uptime(),
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({
    success: true,
    msg: "Test başarılı",
  });
});

// Sağlık endpoint’i
app.get("/health", (req, res) => {
  res.json({
    server: "running",
    time: new Date().toISOString(),
  });
});

// 404 Kontrolü
app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    path: req.originalUrl,
  });
});

// SUNUCU BAŞLAT
app.listen(PORT, () => {
  console.log("InflowAI API çalışıyor:", PORT);
});
