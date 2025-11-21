// config/featuresConfig.js
// =========================================
// InflowAI Ortak Feature Config (API + UI)
// trackedMetrics: UI için DİZİ
// trackedMetricsMap: Engine için OBJE
// =========================================

module.exports = {
  version: "1.0.0",
  lastUpdated: "2025-11-21",

  // UI'da “Ortak hedefleri” olarak gösterilecek
  strategicGoals: [
    "Platform büyümesini sürdürülebilir şekilde artır",
    "Premium / Kurumsal / B2B geçiş sinyallerini topla",
    "Uptime ve performansı stabil tut",
    "Spam / bot trafiğini filtrele",
    "Veri kaybını sıfıra indir (Sonsuzluk Merkezi uyumu)"
  ],

  // UI DİZİ ister (forEach/map)
  trackedMetrics: [
    "traffic",
    "activeUsers",
    "growthRate",
    "uptime",
    "errorRate",
    "apiLatency"
  ],

  // Engine OBJE ister (idealRange’ler burada)
  trackedMetricsMap: {
    traffic: {
      label: "Trafik (15dk)",
      unit: "visit",
      idealRange: {
        minPer15Min: 50,
        targetPer15Min: 120
      }
    },

    activeUsers: {
      label: "Aktif Kullanıcı",
      unit: "user",
      idealRange: {
        min: 30,
        target: 90
      }
    },

    growthRate: {
      label: "Büyüme Oranı",
      unit: "%",
      idealRange: {
        min: 1,
        targetMin: 2,
        targetMax: 6
      }
    },

    uptime: {
      label: "Uptime",
      unit: "%",
      idealRange: {
        min: 95,
        target: 99.5
      }
    },

    errorRate: {
      label: "Hata Oranı",
      unit: "%",
      idealRange: {
        max: 2
      }
    },

    apiLatency: {
      label: "API Gecikme",
      unit: "ms",
      idealRange: {
        warn: 450
      }
    }
  },

  // UI'da “Hızlı İşlemler / Komutlar” bölümü
  actionTemplates: [
    {
      id: "growth_pulse",
      name: "Büyüme Paneli",
      desc: "Growth katmanını ve trafik ivmesini analiz eder",
      layer: "growth"
    },
    {
      id: "security_shield",
      name: "Güvenlik Paneli",
      desc: "Security katmanındaki zafiyetleri ve riskleri tarar",
      layer: "security"
    },
    {
      id: "services_hub",
      name: "Servisler",
      desc: "Services katmanının aktifliğini kontrol eder",
      layer: "services"
    },
    {
      id: "sharing_sync",
      name: "Sharing",
      desc: "Paylaşım / virallik / sosyal sinyal takibini açar",
      layer: "sharing"
    },
    {
      id: "updating_core",
      name: "Updating",
      desc: "Sistem güncelleme planı ve versiyon kontrolü",
      layer: "updating"
    },
    {
      id: "infinity_guard",
      name: "Sonsuzluk Merkezi",
      desc: "Veri yedek, arıza kurtarma ve hayat sigortası katmanı",
      layer: "infinity"
    }
  ],

  // UI’da sekmeler / modlar
  modes: [
    "overview",
    "core",
    "growth",
    "services",
    "sharing",
    "security",
    "updating",
    "monetization",
    "infinity"
  ]
};
