// engine/ortakEngine.js
// InflowAI E-Ticaret API - Ortak Beyin (Bellek içi store)
// Not: Şu anda bellek içi çalışıyor. İleride DB'ye geçmek kolay.

const { featureConfig } = require("../config/featuresConfig");

// -----------------------------
// Seed Kategoriler
// -----------------------------
const seedCategories = [
  { id: 1, name: "Elektronik", slug: "elektronik", parentId: null },
  { id: 2, name: "Bilgisayar", slug: "bilgisayar", parentId: 1 },
  { id: 3, name: "Telefon", slug: "telefon", parentId: 1 },
  { id: 4, name: "Ev & Yaşam", slug: "ev-yasam", parentId: null },
  { id: 5, name: "Giyim", slug: "giyim", parentId: null },
];

// -----------------------------
// Seed Ürünler
// -----------------------------
const seedProducts = [
  {
    id: 1,
    name: 'Inflow Ultrabook 14"',
    description:
      "Hafif, güçlü, içerik üreticiler ve e-ticaret yöneticileri için ideal ultrabook.",
    price: 18999,
    currency: "TRY",
    stock: 12,
    categoryId: 2,
    type: "physical",
    status: "active",
    images: [],
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Inflow Phone Pro 256GB",
    description: "5G destekli, yüksek performanslı akıllı telefon.",
    price: 24999,
    currency: "TRY",
    stock: 20,
    categoryId: 3,
    type: "physical",
    status: "active",
    images: [],
    createdAt: "2025-01-02T00:00:00.000Z",
    updatedAt: "2025-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Inflow Kablosuz Kulaklık ANC",
    description: "Aktif gürültü engelleme, BT 5.3, şarj kutulu.",
    price: 1999,
    currency: "TRY",
    stock: 0,
    categoryId: 1,
    type: "physical",
    status: "active",
    images: [],
    createdAt: "2025-01-03T00:00:00.000Z",
    updatedAt: "2025-01-03T00:00:00.000Z",
  },
];

// -----------------------------
// Seed Siparişler (örnek)
// -----------------------------
const seedOrders = [
  {
    id: 1,
    orderNo: "INF-000001",
    status: "completed",
    paymentStatus: "paid",
    total: 1999,
    currency: "TRY",
    shippingType: "manual",
    shippingProvider: "manual",
    shippingTrackingCode: "MANUAL-DEMO-1",
    createdAt: "2025-01-05T10:00:00.000Z",
    updatedAt: "2025-01-05T10:10:00.000Z",
    customer: {
      name: "Demo Müşteri",
      email: "demo@example.com",
    },
    items: [
      {
        productId: 3,
        name: "Inflow Kablosuz Kulaklık ANC",
        quantity: 1,
        price: 1999,
        currency: "TRY",
      },
    ],
  },
];

// -----------------------------
// Bellek içi store
// -----------------------------
const store = {
  categories: [...seedCategories],
  products: [...seedProducts],
  orders: [...seedOrders],
};

let lastProductId = store.products.reduce(
  (max, p) => (p.id > max ? p.id : max),
  0
);
let lastOrderId = store.orders.reduce(
  (max, o) => (o.id > max ? o.id : max),
  0
);

// Genel erişim
function getStore() {
  return store;
}

// -----------------------------
// KATEGORİLER
// -----------------------------
function listCategories() {
  return store.categories;
}

// -----------------------------
// ÜRÜNLER
// -----------------------------
function listProducts(filters = {}) {
  const {
    categoryId,
    q,
    minPrice,
    maxPrice,
    inStockOnly,
    status,
  } = filters;

  let result = [...store.products];

  if (status) {
    result = result.filter((p) => p.status === status);
  }

  if (typeof categoryId !== "undefined" && categoryId !== null) {
    const cid = Number(categoryId);
    result = result.filter((p) => p.categoryId === cid);
  }

  if (typeof minPrice !== "undefined" && minPrice !== null) {
    const min = Number(minPrice);
    if (!Number.isNaN(min)) {
      result = result.filter((p) => p.price >= min);
    }
  }

  if (typeof maxPrice !== "undefined" && maxPrice !== null) {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      result = result.filter((p) => p.price <= max);
    }
  }

  if (inStockOnly) {
    result = result.filter((p) => p.stock > 0);
  }

  if (q && typeof q === "string" && q.trim()) {
    const term = q.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
    );
  }

  return result;
}

function getProductById(id) {
  const pid = Number(id);
  return store.products.find((p) => p.id === pid) || null;
}

function createProduct(input = {}) {
  if (!input.name) {
    throw new Error("Ürün adı zorunludur.");
  }

  lastProductId += 1;
  const now = new Date().toISOString();

  const product = {
    id: lastProductId,
    name: input.name,
    description: input.description || "",
    price: Number(input.price) || 0,
    currency: input.currency || featureConfig.defaultCurrency,
    stock:
      typeof input.stock === "number" && !Number.isNaN(input.stock)
        ? input.stock
        : 0,
    categoryId: input.categoryId ? Number(input.categoryId) : null,
    type: input.type === "digital" ? "digital" : "physical",
    status: input.status || "active",
    images: Array.isArray(input.images) ? input.images : [],
    createdAt: now,
    updatedAt: now,
  };

  store.products.push(product);
  return product;
}

function updateProduct(id, input = {}) {
  const product = getProductById(id);
  if (!product) {
    throw new Error("Ürün bulunamadı.");
  }

  if (typeof input.name !== "undefined") {
    product.name = input.name;
  }
  if (typeof input.description !== "undefined") {
    product.description = input.description;
  }
  if (typeof input.price !== "undefined") {
    product.price = Number(input.price) || 0;
  }
  if (typeof input.currency !== "undefined") {
    product.currency = input.currency;
  }
  if (typeof input.stock !== "undefined") {
    const s = Number(input.stock);
    product.stock = Number.isNaN(s) ? product.stock : s;
  }
  if (typeof input.categoryId !== "undefined") {
    product.categoryId = Number(input.categoryId) || null;
  }
  if (typeof input.type !== "undefined") {
    product.type = input.type === "digital" ? "digital" : "physical";
  }
  if (typeof input.status !== "undefined") {
    product.status = input.status;
  }
  if (typeof input.images !== "undefined" && Array.isArray(input.images)) {
    product.images = input.images;
  }

  product.updatedAt = new Date().toISOString();
  return product;
}

function deleteProduct(id) {
  const pid = Number(id);
  const index = store.products.findIndex((p) => p.id === pid);
  if (index === -1) {
    throw new Error("Ürün bulunamadı.");
  }
  const [removed] = store.products.splice(index, 1);
  return removed;
}

// -----------------------------
// SİPARİŞ & CHECKOUT
// -----------------------------

// Sadece hesaplama - stok düşmez
function previewOrder(input = {}) {
  const { items, currency } = input;

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Ön izleme için en az 1 ürün gereklidir.");
  }

  const normalizedItems = items.map((item) => {
    const product = getProductById(item.productId);
    if (!product) {
      throw new Error(`Ürün bulunamadı: ${item.productId}`);
    }
    const quantity = Number(item.quantity) || 1;
    if (quantity <= 0) {
      throw new Error("Adet 1 veya daha büyük olmalıdır.");
    }
    const lineTotal = product.price * quantity;
    return {
      productId: product.id,
      name: product.name,
      quantity,
      price: product.price,
      currency: product.currency || featureConfig.defaultCurrency,
      lineTotal,
    };
  });

  const itemsTotal = normalizedItems.reduce(
    (sum, item) => sum + item.lineTotal,
    0
  );

  // Şimdilik sabit kargo (manuel)
  const shippingCost = 0; // ileride dinamik hale getirilebilir
  const grandTotal = itemsTotal + shippingCost;

  return {
    currency: currency || featureConfig.defaultCurrency,
    items: normalizedItems,
    itemsTotal,
    shippingCost,
    grandTotal,
    shippingType: "manual",
    paymentMode: featureConfig.modules.payments.mode,
  };
}

// Gerçek sipariş - stok düşer
function createOrder(input = {}) {
  const { items, customer, notes } = input;

  const preview = previewOrder({ items }); // doğrulama + hesaplama

  lastOrderId += 1;
  const now = new Date().toISOString();

  // Stok düş
  preview.items.forEach((item) => {
    const product = getProductById(item.productId);
    if (product) {
      if (product.stock < item.quantity) {
        throw new Error(`Yetersiz stok: ${product.name}`);
      }
      product.stock -= item.quantity;
      product.updatedAt = now;
    }
  });

  const order = {
    id: lastOrderId,
    orderNo: `INF-${String(lastOrderId).padStart(6, "0")}`,
    status: "pending",
    paymentStatus: "pending",
    total: preview.grandTotal,
    currency: preview.currency,
    shippingType: "manual",
    shippingProvider: "manual",
    shippingTrackingCode: null,
    createdAt: now,
    updatedAt: now,
    customer: customer || null, // { name, email, phone, address } vb.
    items: preview.items,
    notes: notes || null,
  };

  store.orders.push(order);
  return order;
}

function listOrders() {
  return store.orders;
}

function getOrderById(id) {
  const oid = Number(id);
  return store.orders.find((o) => o.id === oid) || null;
}

function updateOrder(id, input = {}) {
  const order = getOrderById(id);
  if (!order) {
    throw new Error("Sipariş bulunamadı.");
  }

  if (typeof input.status !== "undefined") {
    order.status = input.status;
  }
  if (typeof input.paymentStatus !== "undefined") {
    order.paymentStatus = input.paymentStatus;
  }
  if (typeof input.shippingTrackingCode !== "undefined") {
    order.shippingTrackingCode = input.shippingTrackingCode || null;
  }
  if (typeof input.shippingProvider !== "undefined") {
    order.shippingProvider = input.shippingProvider || order.shippingProvider;
  }

  order.updatedAt = new Date().toISOString();
  return order;
}

// -----------------------------
// ANALİZ / ÖZET
// -----------------------------
function analyzeMetrics() {
  const totalOrders = store.orders.length;
  const totalSales = store.orders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderValue =
    totalOrders > 0 ? Number((totalSales / totalOrders).toFixed(2)) : 0;

  const totalProducts = store.products.length;
  const activeProducts = store.products.filter(
    (p) => p.status === "active"
  ).length;
  const outOfStock = store.products.filter((p) => p.stock === 0).length;

  const productSalesMap = {};
  store.orders.forEach((order) => {
    order.items.forEach((item) => {
      productSalesMap[item.productId] =
        (productSalesMap[item.productId] || 0) + item.quantity;
    });
  });

  const trendingProducts = Object.entries(productSalesMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([productId, quantity]) => {
      const product = getProductById(productId);
      return {
        productId: Number(productId),
        name: product ? product.name : "Bilinmeyen ürün",
        quantity,
      };
    });

  return {
    totals: {
      totalSales,
      totalOrders,
      averageOrderValue,
      totalProducts,
      activeProducts,
      outOfStock,
    },
    trendingProducts,
  };
}

function buildSummary() {
  return {
    generatedAt: new Date().toISOString(),
    metrics: analyzeMetrics(),
    featureConfig,
  };
}

module.exports = {
  // Genel
  featureConfig,
  getStore,

  // Kategoriler
  listCategories,

  // Ürünler
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,

  // Sipariş / Checkout
  previewOrder,
  createOrder,
  listOrders,
  getOrderById,
  updateOrder,

  // Analiz
  analyzeMetrics,
  buildSummary,
};
