// config/featuresConfig.js
// InflowAI E-Ticaret API - Özellik Konfigürasyonu

const featureConfig = {
  platformName: "InflowAI E-Commerce",
  version: "1.0.0",

  defaultCurrency: "TRY",
  supportedCurrencies: ["TRY", "USD", "EUR"],

  defaultLocale: "tr-TR",
  supportedLocales: ["tr-TR", "en-US"],

  modules: {
    catalog: {
      enabled: true,
      variants: true,
      stockTracking: true,
    },
    categories: {
      enabled: true,
    },
    orders: {
      enabled: true,
      guestCheckout: true,
    },
    customers: {
      enabled: true,
    },
    payments: {
      enabled: true,
      mode: "manual", // şimdilik MANUEL ödeme (havale / kapıda vb.)
      providers: {
        paytr: {
          enabled: false, // PayTR anahtarlarını aldığında true yapılacak
          mode: "test",
        },
      },
    },
    shipping: {
      enabled: true,
      mode: "manual", // şimdilik manuel kargo
      providers: {
        manual: { enabled: true },
        mng: { enabled: false },
        yurtiçi: { enabled: false },
        aras: { enabled: false },
        ptt: { enabled: false },
        ups: { enabled: false },
      },
    },
    coupons: {
      enabled: true,
    },
    analytics: {
      enabled: true,
      realtime: true,
    },
  },

  limits: {
    maxProducts: 100000,
    maxCategories: 5000,
    maxImagesPerProduct: 20,
  },
};

module.exports = { featureConfig };
