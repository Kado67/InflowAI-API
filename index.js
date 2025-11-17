// ==============================
// InflowAI API - Çalışan Sürüm
// ==============================

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5050;

// CORS ve JSON
app.use(cors());
app.use(express.json());

// Kök endpoint: Kontrol Merkezi burayı test ediyor
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "InflowAI API aktif",
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`✅ InflowAI API çalışıyor: ${PORT}`);
});
