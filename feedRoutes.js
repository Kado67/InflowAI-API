const express = require("express");
const router = express.Router();

const ProductModule = require("./modules/products/model");
const Product = ProductModule.default || ProductModule;

router.get("/products-xml", async (req, res) => {
  try {
    const products = await Product.find().lean();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<products>\n`;

    products.forEach((p) => {
      xml += `
  <product>
    <id>${p._id}</id>
    <name><![CDATA[${p.name || ""}]]></name>
    <price>${p.price || 0}</price>
    <image><![CDATA[${p.image || ""}]]></image>
    <stock>${p.stock || 0}</stock>
  </product>`;
    });

    xml += `\n</products>`;

    res.set("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error("XML üretim hatası:", err);
    res.status(500).send("XML üretilemedi");
  }
});

module.exports = router;
