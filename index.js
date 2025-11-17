// InflowAI Basit API Sunucusu
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5050; // Kontrol merkezinin bağlanacağı port

// Orta katmanlar
app.use(cors());
app.use(bodyParser.json());

// Basit sağlık kontrolü
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "InflowAI-API",
    time: new Date().toISOString(),
  });
});

// Örnek: Kontrol merkezine sahte core verisi
app.get("/core/state", (req, res) => {
  res.json({
    aiStatus: 93,
    serverLoad: 24,
    activeUsers: 105,
    growthRate: 2.4,
    uptime: "99.9%",
  });
});

// Örnek: Ortak paneli için sahte istatistikler
app.get("/partner/overview", (req, res) => {
  res.json({
    message: "İyi akşamlar, platform gündelik olarak büyüyor.",
    liveTraffic: [5, 10, 3, 18, 6, 12, 9, 20, 7, 14],
    activeVisitors: 101,
    deliveredPackets: [3, 6, 12, 18, 25, 30],
    growthPercent: 2.8,
    devices: {
      phone: "Cenekte",
      desktop: "Cenekte",
      car: "Offline",
    },
  });
});

// Bilinmeyen adresler
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.path });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`✅ InflowAI API çalışıyor: http://localhost:${PORT}`);
});
