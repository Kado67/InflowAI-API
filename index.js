// index.js
// =========================================
// InflowAI API - Başlangıç dosyası
// Render burada "node index.js" ile başlatıyor
// =========================================

const app = require("./app");

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("////////////////////////////////////////");
  console.log(` InflowAI API çalışıyor: ${PORT}`);
  console.log(" Ortak motoru ve görev sistemi aktif.");
  console.log("////////////////////////////////////////");
});
