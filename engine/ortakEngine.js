// engine/ortakEngine.js
// =========================================
// Ortak kontrol motoru
// - Metrikleri analiz eder
// - Özet, mod ve öneri üretir
// - config/featuresConfig.js ile birlikte çalışır
// =========================================

const featureConfig = require("../config/featuresConfig");
const M = featureConfig.trackedMetricsMap; // Engine metrik haritası

// Basit skor hesabı (0–100 arası)
function normalize(value, idealMin, idealMax) {
  if (idealMax === undefined) {
    idealMax = idealMin;
    idealMin = 0;
  }
  if (value <= idealMin) return 20;
  if (value >= idealMax) return 95;
  const ratio = (value - idealMin) / (idealMax - idealMin);
  return Math.round(20 + ratio * 75);
}

// Ortak'ın ruh hâli
function detectMood({ growthRate, uptime, errorRate }) {
  if (errorRate > 5 || uptime < 95) return "Dikkatli";
  if (growthRate >= 5 && uptime >= 99) return "Heyecanlı";
  if (growthRate >= 2) return "Kararlı";
  return "Sakin";
}

// Konfigürasyona göre aksiyon seç
function pickActions(metrics) {
  const actions = [];

  if (metrics.growthRate < M.growthRate.idealRange.min) {
    actions.push("Büyüme düşük: Landing ve içerik akışında A/B testleri başlat.");
  } else if (
    metrics.growthRate >= M.growthRate.idealRange.targetMin &&
    metrics.growthRate <= M.growthRate.idealRange.targetMax
  ) {
    actions.push("Büyüme sağlıklı: Premium ve Kurumsal paketler için sinyal toplamaya devam et.");
  } else {
    actions.push("Büyüme agresif: Altyapı kapasitesini, limitleri ve olası spam trafiğini kontrol et.");
  }

  if (metrics.uptime < M.uptime.idealRange.min) {
    actions.push("Uptime kritik: İzleme, loglama ve hata bildirimlerini önceliklendir.");
  }

  if (metrics.apiLatency > M.apiLatency.idealRange.warn) {
    actions.push("API gecikmesi yüksek: Render planını, sorgu optimizasyonlarını ve gereksiz istekleri gözden geçir.");
  }

  if (metrics.errorRate > M.errorRate.idealRange.max) {
    actions.push("Hata oranı yüksek: En çok hata üreten endpoint ve sayfaları loglardan tespit et.");
  }

  if (actions.length === 0) {
    actions.push("Her şey stabil görünüyor: İçerik üretimine ve uzun vadeli büyüme planlarına odaklan.");
  }

  return actions;
}

// Ana analiz fonksiyonu
function analyzeMetrics(inputMetrics = {}) {
  const metrics = {
    traffic: inputMetrics.traffic ?? 120,
    activeUsers: inputMetrics.activeUsers ?? 90,
    growthRate: inputMetrics.growthRate ?? 3.4,
    uptime: inputMetrics.uptime ?? 99.2,
    errorRate: inputMetrics.errorRate ?? 0.7,
    apiLatency: inputMetrics.apiLatency ?? 420,
  };

  const scores = {
    trafficScore: normalize(
      metrics.traffic,
      M.traffic.idealRange.minPer15Min,
      M.traffic.idealRange.targetPer15Min
    ),
    activeScore: normalize(
      metrics.activeUsers,
      M.activeUsers.idealRange.min,
      M.activeUsers.idealRange.target
    ),
    growthScore: normalize(
      metrics.growthRate,
      M.growthRate.idealRange.min,
      M.growthRate.idealRange.targetMax
    ),
    uptimeScore: normalize(
      metrics.uptime,
      M.uptime.idealRange.min,
      M.uptime.idealRange.target
    ),
    stabilityScore: 100 - normalize(
      metrics.errorRate,
      0,
      M.errorRate.idealRange.max * 3
    ),
  };

  const globalHealth = Math.round(
    (scores.trafficScore +
      scores.activeScore +
      scores.growthScore +
      scores.uptimeScore +
      scores.stabilityScore) / 5
  );

  const mood = detectMood(metrics);
  const actions = pickActions(metrics);

  return {
    metrics,
    scores,
    globalHealth,
    mood,
    actions,
    configVersion: featureConfig.version,
  };
}

// Ortak özeti – UI’da gösterilecek metinler
function buildSummary() {
  const analysis = analyzeMetrics();

  const summaryText =
    `Aktif ziyaretçi yaklaşık ${analysis.metrics.activeUsers}. ` +
    `Günlük büyüme ${analysis.metrics.growthRate.toFixed(1)}%. ` +
    `Sistem sağlığı ${analysis.globalHealth}/100 seviyesinde. ` +
    `Ortak şu anda "${analysis.mood}" modunda ve ${analysis.actions[0]}`;

  return {
    mood: analysis.mood,
    summary: summaryText,
    healthScore: analysis.globalHealth,
    mainActionHint: analysis.actions[0],
    allActions: analysis.actions,
    metrics: analysis.metrics,
    scores: analysis.scores,
  };
}

// UI için temiz config (dizi + template)
const featureConfigUI = {
  strategicGoals: featureConfig.strategicGoals,
  trackedMetrics: featureConfig.trackedMetrics,        // DİZİ
  trackedMetricsMap: featureConfig.trackedMetricsMap,  // OBJE (detaylar)
  actionTemplates: featureConfig.actionTemplates,
  modes: featureConfig.modes,
  version: featureConfig.version,
  lastUpdated: featureConfig.lastUpdated
};

// Dışa aktar
module.exports = {
  analyzeMetrics,
  buildSummary,
  featureConfig: featureConfigUI,
};
