// config/featuresConfig.js
// =========================================
// Ortak'ın takip edeceği ana hedefler ve görevler
// =========================================

const featureConfig = {
  version: "1.0.0",
  lastUpdated: "2025-11-18",

  // Platformun ana hedefleri
  strategicGoals: [
    {
      id: "growth_global",
      title: "Küresel Büyüme",
      description:
        "Ziyaretçi sayısını sürdürülebilir şekilde artırmak, yeni ülkeler ve dillerde görünür olmak.",
      priority: "yüksek",
    },
    {
      id: "quality_content",
      title: "İçerik Kalitesi",
      description:
        "Kullanıcıya gerçekten fayda sağlayan, tekrar ziyaret getiren içerikleri öne çıkarmak.",
      priority: "yüksek",
    },
    {
      id: "monetization",
      title: "Gelir Optimizasyonu",
      description:
        "Google AdSense, Premium, Kurumsal ve B2B paketler için en sağlıklı büyüme senaryolarını bulmak.",
      priority: "orta",
    },
    {
      id: "stability_security",
      title: "Stabilite ve Güvenlik",
      description:
        "Uptime, hata oranı ve güvenlik açıklarını sürekli izlemek, kritik sorunları hızlıca işaretlemek.",
      priority: "yüksek",
    },
  ],

  // Ortak'ın takip ettiği temel metrikler
  trackedMetrics: {
    traffic: {
      id: "traffic",
      label: "Canlı Trafik",
      description: "Son 15 dakikadaki canlı trafik ve günlük toplam ziyaret.",
      idealRange: {
        minPer15Min: 10,
        targetPer15Min: 150,
      },
    },
    activeUsers: {
      id: "activeUsers",
      label: "Aktif Ziyaretçi",
      description: "Şu anda platformda tahmini aktif kullanıcı sayısı.",
      idealRange: {
        min: 30,
        target: 150,
      },
    },
    growthRate: {
      id: "growthRate",
      label: "Büyüme Oranı",
      description: "Günlük bazda büyüme yüzdesi (sağlıklı büyüme 2–8% arası).",
      idealRange: {
        min: 1,
        targetMin: 2,
        targetMax: 8,
      },
    },
    uptime: {
      id: "uptime",
      label: "Uptime",
      description: "Son 24 saatte kontrol merkezinin çalışma yüzdesi.",
      idealRange: {
        min: 97,
        target: 99.5,
      },
    },
    errorRate: {
      id: "errorRate",
      label: "Hata Oranı",
      description: "Son isteklerde görülen hata yüzdesi.",
      idealRange: {
        max: 2,
      },
    },
    apiLatency: {
      id: "apiLatency",
      label: "API Gecikmesi",
      description:
        "Render üzerindeki API gecikmesi (ms). 500 ms üstü dikkat gerektirir.",
      idealRange: {
        max: 800,
        warn: 500,
      },
    },
  },

  // Ortak'ın önerebileceği aksiyon şablonları
  actionTemplates: [
    {
      id: "improve_landing",
      when: "growth_low",
      title: "Landing Page Testleri",
      details:
        "Büyüme düşükse, ana sayfa başlıkları, CTA butonları ve ücretsiz paket akışını A/B testlerine ayır.",
    },
    {
      id: "boost_content",
      when: "traffic_low",
      title: "İçerik Takvimi",
      details:
        "Trafik düşükse, haftalık içerik takvimi oluştur, en iyi performans gösteren içerik türünü çoğalt.",
    },
    {
      id: "adsense_ready",
      when: "traffic_stable",
      title: "AdSense Hazırlığı",
      details:
        "Trafik ve büyüme stabil ise, AdSense yerleşimlerini test etmeye başla, reklam yoğunluğunu kademeli artır.",
    },
    {
      id: "premium_signals",
      when: "engagement_high",
      title: "Premium Sinyalleri",
      details:
        "Kullanıcıların sık kullandığı özellikleri tespit et, Premium ve Kurumsal paket için sinyal listesi oluştur.",
    },
    {
      id: "stability_focus",
      when: "stability_risk",
      title: "Stabilite Önceliği",
      details:
        "Uptime veya hata oranı kritik seviyedeyse, yeni özellikleri yavaşlat, önce altyapı ve izleme sistemini güçlendir.",
    },
  ],

  // Ortak'ın modları
  modes: [
    {
      id: "insan",
      label: "İnsan Gözlemi Açık",
      description:
        "Ortak öneriler sunar, ama son kararı her zaman kontrol merkezindeki insan verir.",
      default: true,
    },
    {
      id: "otonom",
      label: "Otonom Mod (Gelecek)",
      description:
        "Ortak belirli güvenli aksiyonları otomatik alır (şimdilik sadece planlama aşamasında).",
      default: false,
    },
  ],
};

module.exports = featureConfig;
