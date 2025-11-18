// =======================================
// InflowAI - ORTAK Özellik Konfigürasyonu
// =======================================
//
// Bu dosya ORTAK için evrensel görev haritasıdır.
// - Kontrol Merkezindeki tüm kartlar, metrikler, modlar
// - Gelecek özellikler, büyüme hedefleri
// - Komut haritası ve platform yetenekleri
// hepsi buradan yönetilir.
//
// NOT:
// Buradaki sayılar "üst sınır" değil, rehberdir.
// ORTAK kendini güncelleyebilen, öğrenen bir yapı
// olarak tasarlanmıştır. Sonsuz ölçek için hazır.

// Ortak hakkında temel meta bilgiler
const meta = {
  name: "ORTAK",
  version: "1.0.0",
  codename: "Infinity-Core",
  description:
    "InflowAI platformunu dünya lideri yapmak için tasarlanmış, sürekli öğrenen kontrol merkezi ortağı.",
  createdAt: "2025-11-18",
  lastUpdated: "2025-11-18",
};

// Ortak’ın ana hedefleri
const goals = {
  primary: [
    "InflowAI platformunu alanında dünya birincisi yapmak.",
    "Platformun her saniye öğrenmesini, büyümesini ve kendini geliştirmesini sağlamak.",
    "Tüm verileri tek noktadan izleyip, olası riskleri erken tespit etmek.",
    "Yeni özellik, fikir ve entegrasyon önerileri üretmek.",
    "Platform sahibine (Kadir) net ve uygulaması kolay aksiyonlar sunmak.",
  ],
  secondary: [
    "Kullanıcı deneyimini her sürümde daha iyi hale getirmek.",
    "Gelir, trafik ve etkileşimde sürdürülebilir büyüme sağlamak.",
    "Güvenlik açıklarını, performans sorunlarını ve hataları minimuma indirmek.",
    "Platformun uzun vadeli “sonsuzluk merkezi” vizyonuna uyumlu kalmak.",
  ],
};

// 7 Katmanlı yapı (Core → Control)
const layers = {
  core: {
    id: "core",
    name: "Core (Beyin)",
    description:
      "Platformun ana zekâ katmanı. Öğrenme, model davranışları ve karar mekanizması.",
    focus: ["öğrenme", "davranış analizi", "model ayarları", "deneyler"],
  },
  growth: {
    id: "growth",
    name: "Growth",
    description:
      "Trafik, ziyaretçiler, etkileşim, dönüşüm ve büyüme hızını izleyen katman.",
    focus: ["trafik", "aktif ziyaretçi", "büyüme hızı", "kampanyalar"],
  },
  services: {
    id: "services",
    name: "Services",
    description:
      "API, web, ödeme, e-posta gibi tüm servislerin sağlığını takip eden katman.",
    focus: ["API durumu", "üçüncü parti servisler", "uptime", "limitler"],
  },
  sharing: {
    id: "sharing",
    name: "Sharing",
    description:
      "İçerik, paylaşım, sosyal medya ve referans trafiğini yöneten katman.",
    focus: ["içerik dağıtımı", "sosyal ağlar", "paylaşım oranları"],
  },
  security: {
    id: "security",
    name: "Security",
    description:
      "Güvenlik, saldırı tespiti, kötü kullanım ve veri koruma katmanı.",
    focus: ["saldırı izleme", "giriş denemeleri", "API anahtarları", "loglar"],
  },
  updating: {
    id: "updating",
    name: "Updating",
    description:
      "Güncellemeler, versiyonlar, değişiklik günlüğü ve otomatik iyileştirme katmanı.",
    focus: ["sürüm yönetimi", "değişiklik etkisi", "rollback planları"],
  },
  control: {
    id: "control",
    name: "Control",
    description:
      "Komut verme, mod değiştirme, acil durum ve genel sistem kontrol katmanı.",
    focus: ["komut haritası", "acil durum modları", "otomasyon senaryoları"],
  },
};

// Ortak’ın çalışırken kullanacağı ana metrikler
const metrics = {
  traffic: {
    id: "traffic",
    name: "Canlı Trafik",
    unit: "ziyaret/15dk",
    targetRange: [50, "∞"], // alt sınır 50, üst sınır teorik olarak yok
  },
  activeUsers: {
    id: "activeUsers",
    name: "Aktif Ziyaretçi",
    unit: "anlık kullanıcı",
    targetRange: [30, "∞"],
  },
  growthRate: {
    id: "growthRate",
    name: "Büyüme Oranı",
    unit: "%",
    targetRange: [2, 15], // 2–15% arası sağlıklı günlük büyüme
  },
  healthScore: {
    id: "healthScore",
    name: "Sağlık Skoru",
    unit: "/100",
    targetRange: [80, 100],
  },
  uptime: {
    id: "uptime",
    name: "Uptime",
    unit: "%",
    targetRange: [99.0, 100.0],
  },
  apiLatency: {
    id: "apiLatency",
    name: "API Gecikmesi",
    unit: "ms",
    targetRange: [0, 1200], // Render free için 1200ms altında kabul
  },
  errorRate: {
    id: "errorRate",
    name: "Hata Oranı",
    unit: "%",
    targetRange: [0, 1.0],
  },
};

// ORTAK komut haritası
// Bu liste gelecekte büyüyebilir; engine bu komutlara göre davranacak.
const commands = {
  // Platform analizi
  scanPlatform: {
    id: "scanPlatform",
    label: "Platformu Tara",
    description:
      "Tüm katmanları hızlıca tarar, özet bir sağlık ve büyüme raporu çıkarır.",
    categories: ["genel", "analiz"],
    suggestedTriggers: ["günlük-özet", "yüksek-trafik", "düşük-büyüme"],
  },

  findMissingFeatures: {
    id: "findMissingFeatures",
    label: "Eksik Özellik Bul",
    description:
      "Platformda eksik olabilecek, rakiplerde olup sende olmayan veya katma değerli olabilecek yeni özellikler önerir.",
    categories: ["özellik-keşfi", "strateji"],
    suggestedTriggers: ["haftalık-analiz", "düşük-dönüşüm"],
  },

  optimizeGrowth: {
    id: "optimizeGrowth",
    label: "Büyümeyi Optimize Et",
    description:
      "Trafik, aktif kullanıcı, paket teslimi ve büyüme oranını inceleyerek somut iyileştirme adımları önerir.",
    categories: ["büyüme", "trafik", "dönüşüm"],
    suggestedTriggers: ["büyüme-durdu", "kampanya-sonrası"],
  },

  monitorApiHealth: {
    id: "monitorApiHealth",
    label: "API Sağlığını İzle",
    description:
      "Render API’si ve diğer servislerin gecikme, hata ve uptime değerlerini izler, riskleri raporlar.",
    categories: ["servisler", "api", "güvenilirlik"],
    suggestedTriggers: ["yüksek-hata", "timeout", "sistem-yavaş"],
  },

  securitySweep: {
    id: "securitySweep",
    label: "Güvenlik Taraması",
    description:
      "Giriş denemeleri, istek patlamaları, olağan dışı IP’ler ve şüpheli davranışları tarar.",
    categories: ["güvenlik"],
    suggestedTriggers: ["şüpheli-trafik", "ani-yüksek-istek"],
  },

  contentInsights: {
    id: "contentInsights",
    label: "İçerik Önerileri",
    description:
      "Hangi içerik türlerinin daha çok trafik ve dönüşüm getirdiğini analiz edip yeni içerik önerir.",
    categories: ["içerik", "growth"],
    suggestedTriggers: ["içerik-planlama", "düşük-etkileşim"],
  },

  emergencyMode: {
    id: "emergencyMode",
    label: "Acil Durum Modu",
    description:
      "Sistem çökmesi, çok yüksek hata oranı veya kritik problem durumunda, korunma ve kurtarma adımlarını önerir.",
    categories: ["acil", "kontrol"],
    suggestedTriggers: ["uptime-düştü", "kritik-hata"],
  },

  roadmapAdvisor: {
    id: "roadmapAdvisor",
    label: "Yol Haritası Önerisi",
    description:
      "Uzun vadeli özellik listesi, önceliklendirme ve 7/8 katman vizyonuna göre yol haritası önerir.",
    categories: ["strateji", "vizyon"],
    suggestedTriggers: ["aylık-planlama", "büyük-sürüm"],
  },
};

// Zekâ seviyesi ve çalışma modları
const intelligence = {
  modes: [
    {
      id: "observer",
      label: "Gözlemci",
      description:
        "Sessizce veri toplar, not alır, ciddi bir şey görürse uyarı üretir.",
      aggressiveness: 1,
    },
    {
      id: "advisor",
      label: "Danışman",
      description:
        "Aktif olarak öneri, fikir, yeni özellik ve iyileştirme maddeleri sunar.",
      aggressiveness: 2,
    },
    {
      id: "architect",
      label: "Mimar",
      description:
        "Platformu dünya lideri yapmak için makro düzeyde stratejik öneriler üretir.",
      aggressiveness: 3,
    },
  ],
  defaultMode: "advisor",
  // ORTAK’ın karar verirken dikkat ettiği ilkeler
  principles: [
    "Kullanıcı deneyimi her zaman birinci önceliktir.",
    "Performans ve hız, tasarımdan önce gelir.",
    "Güvenlik, hiçbir zaman opsiyonel değildir.",
    "Basit yönetilebilen özellik, karmaşık ama kullanılamayan özelliğe göre daha değerlidir.",
    "Her öneri, net bir aksiyonla birlikte gelmelidir.",
  ],
};

// Uyarı eşikleri (Kontrol Merkezinde uyarı çıkarma kuralları)
const alertRules = [
  {
    id: "lowTraffic",
    description: "Beklenenin çok altında trafik.",
    condition: {
      metric: "traffic",
      operator: "<",
      value: 30,
    },
    severity: "medium",
    suggestionKey: "boostTraffic",
  },
  {
    id: "slowGrowth",
    description: "Büyüme oranı %1’in altına düştü.",
    condition: {
      metric: "growthRate",
      operator: "<",
      value: 1,
    },
    severity: "high",
    suggestionKey: "optimizeGrowth",
  },
  {
    id: "apiDown",
    description: "API cevap vermiyor veya hata oranı çok yüksek.",
    condition: {
      metric: "errorRate",
      operator: ">",
      value: 5,
    },
    severity: "critical",
    suggestionKey: "emergencyMode",
  },
  {
    id: "badHealth",
    description: "Sağlık skoru 70/100 altına düştü.",
    condition: {
      metric: "healthScore",
      operator: "<",
      value: 70,
    },
    severity: "high",
    suggestionKey: "scanPlatform",
  },
];

// Yol haritası seviyeleri (Ortak’ın öncelik sırası)
const roadmap = {
  levels: [
    {
      stage: 1,
      label: "Temel Sağlık",
      focus: ["uptime", "apiLatency", "errorRate"],
      description:
        "İlk hedef: sistemin stabil, kesintisiz ve hızlı çalışması. Eğer bu katman sağlam değilse, büyüme anlamsız.",
    },
    {
      stage: 2,
      label: "Sağlıklı Büyüme",
      focus: ["traffic", "activeUsers", "growthRate"],
      description:
        "İkinci hedef: tutarlı ve kontrollü büyüme. Trafik artarken sistem sağlığı korunmalı.",
    },
    {
      stage: 3,
      label: "Liderlik",
      focus: ["içerik", "özellik-keşfi", "otomasyon"],
      description:
        "Üçüncü hedef: rakiplerden ayrışan özellikler, otomasyonlar ve benzersiz kullanıcı deneyimi.",
    },
    {
      stage: 4,
      label: "Sonsuzluk Merkezi",
      focus: ["veri-arşivi", "acil-durum", "otomatik-karar"],
      description:
        "Uzun vadede tüm verilerin arşivlendiği, kriz anında kendini koruyabilen ve otomatik çözüm üretebilen yapı.",
    },
  ],
  currentStage: 2,
};

// ORTAK’ın öneri üretirken kullanacağı kısa şablonlar
const suggestionTemplates = {
  boostTraffic: [
    "Son 24 saatte trafik beklenen seviyenin altında. Organik arama, sosyal medya ve referans trafiği için en az 3 yeni içerik formatı dene.",
    "Ziyaretçi sayısı düşük. En çok performans alan 3 içeriği belirleyip benzer 5 yeni içerik üret.",
  ],
  improveSpeed: [
    "API gecikme süresi yüksek. Render üzerinde cold-start etkisini azaltmak için sık kontrol çağrıları veya ping mekanizması ekle.",
    "Ana sayfanın yüklenme süresini azaltmak için gereksiz script ve görselleri optimize et.",
  ],
  featureIdeas: [
    "Kullanıcıların en çok kullandığı akışa özel bir 'hızlı erişim' paneli ekle.",
    "Sadık kullanıcılar için seviyeli rozet sistemi düşün. Bu, geri dönüş ve etkileşimi artırabilir.",
    "İçerik üreticilerine özel küçük bir 'istatistik kartı' ekleyerek motivasyonu artır.",
  ],
};

// Dışa aktarma
module.exports = {
  meta,
  goals,
  layers,
  metrics,
  commands,
  intelligence,
  alertRules,
  roadmap,
  suggestionTemplates,
};
