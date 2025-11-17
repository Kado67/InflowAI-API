// =====================================
// InflowAI API – app.js (Tam entegre)
// =====================================

const express = require("express");
const cors = require("cors");

const app = express();

// Ortam ayarları
app.use(cors());
app.use(express.json());

// ========================
// 1) API Test Endpoint
// ========================
app.get("/", (req, res) => {
  res.json({
    status: "InflowAI API çalışıyor ✔",
    message: "Bağlantı başarılı, sistem aktif.",
    version: "1.0.0"
  });
});


// ========================
// 2) Kullanıcı Giriş
// ========================
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ success: false, message: "Eksik bilgi" });

  return res.json({
    success: true,
    message: "Giriş başarılı",
    token: "sample-login-token"
  });
});


// ========================
// 3) Kullanıcı Kayıt
// ========================
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  return res.json({
    success: true,
    message: "Kayıt başarılı"
  });
});


// ========================
// 4) Kontrol Merkezi – Komut
// ========================
app.post("/kontrol", (req, res) => {
  const { komut } = req.body;

  return res.json({
    success: true,
    cevap: `Komut işlendi: ${komut}`
  });
});


// ========================
// 5) Sonsuzluk Merkezi
// ========================
app.post("/sonsuzluk", (req, res) => {
  const { sorun } = req.body;

  return res.json({
    success: true,
    cozum: `Sorun çözüldü: ${sorun}`
  });
});


// ========================
// SUNUCU BAŞLATMA
// Render için zorunlu PORT ayarı
// ========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`InflowAI API çalışıyor → Port: ${PORT}`);
});
