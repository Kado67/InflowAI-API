// ============================================
// InflowAI - API Ana Dosyası (index.js)
// ============================================

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { getOrtakStatus, runCommand } = require("./engine/ortakEngine");

const app = express();
const PORT = process.env.PORT || 5050;

// Orta seviye güvenlik ve JSON desteği
app.use(cors());
app.use(bodyParser.json());

// -------------------------------
// ROOT endpoint
// -------------------------------
app.get("/", (req, res) => {
  res.json({
    status: true,
    message: "InflowAI API aktif ✔",
    endpoints: [
      "/ortak/status",
      "/ortak/command",
    ],
  });
});

// -------------------------------
// ORTAK → Durum (status) endpoint
// -------------------------------
app.get("/ortak/status", (req, res) => {
  try {
    const data = getOrtakStatus();
    res.json({
      success: true,
      ortak: data,
    });
  } catch (err) {
    console.error("Status Error:", err);
    res.status(500).json({
      success: false,
      error: "Ortak durum verisi alınamadı",
      detail: err.message,
    });
  }
});

// -------------------------------
// ORTAK → Komut (command) endpoint
// -------------------------------
//
// Kullanım:
// POST /ortak/command
// {
//   "commandId": "scanPlatform",
//   "options": {}
// }
// -------------------------------
app.post("/ortak/command", (req, res) => {
  try {
    const { commandId, options } = req.body;

    if (!commandId) {
      return res.status(400).json({
        success: false,
        error: "commandId gerekli",
      });
    }

    const result = runCommand(commandId, options);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("Command Error:", err);
    res.status(500).json({
      success: false,
      error: "Komut yürütülemedi",
      detail: err.message,
    });
  }
});

// -------------------------------
// Server Start
// -------------------------------
app.listen(PORT, () => {
  console.log(`InflowAI API çalışıyor: http://localhost:${PORT}`);
});
