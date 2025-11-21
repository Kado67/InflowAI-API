// index.js
// =========================================
// InflowAI API - Başlatıcı
// =========================================

const app = require("./app");
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("////////////////////////////////////////");
  console.log(` InflowAI API ÇALIŞIYOR → PORT: ${PORT}`);
  console.log(" Ortak motor online ✔");
  console.log("////////////////////////////////////////");
});
