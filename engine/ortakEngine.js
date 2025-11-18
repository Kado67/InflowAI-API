// =======================================
// InflowAI - ORTAK Motoru
// engine/ortakEngine.js
// =======================================
//
// Bu dosya, ORTAK'ın asıl "beyin" tarafı.
// - config/featuresConfig.js içindeki tüm bilgileri kullanır.
// - Rastgele ama mantıklı metrikler üretir (demo amaçlı).
// - Uyarıları hesaplar.
// - Öneriler ve komut sonuçları üretir.
//
// NOT:
// Gerçek platform verilerine bağlanmak istediğimizde
// sadece aşağıdaki fake veri üreten kısımları
// gerçek API çağrılarıyla değiştirmemiz yeterli olacak.

const {
  meta,
  goals,
  layers,
  metrics,
  commands,
  intelligence,
  alertRules,
  roadmap,
  suggestionTemplates,
} = require("../config/featuresConfig");

// Küçük yardımcı fonksiyonlar ---------------------------

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function randInt(min, max) {
  return Math.floor(rand(min, max));
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function pickRandom(arr) {
  if (!arr || arr.length === 0) return null;
  const i = randInt(0, arr.length);
  return arr[i];
}

// Mood hesaplama ----------------------------------------

function calculateMood(growth, healthScore) {
  // growth: %, healthScore: 0-100
  if (growth >= 6 && healthScore >= 85) return "HEYECANLI";
  if (growth >= 3 && healthScore >= 75) return "KARARLI";
  if (growth >= 1 && healthScore >= 60) return "DENGELİ";
  if (healthScore < 60) return "TEMKİNLİ";
  return "SAKİN";
}

// Metrik üretimi (şimdilik demo / sahte) ----------------
// Burada gerçek InflowAI verilerine bağlanmadık.
// UI tarafı test ederken platformu "canlı" gibi göstermek için
// config’teki hedef aralıklara yakın random değerler üretiriz.

function generateMetricValue(metricDef) {
  const [minTarget, maxTarget] = metricDef.targetRange;

  // Eğer üst sınır "∞" ise, alt sınırın biraz üstünde dolaşan bir değer üret.
  if (maxTarget === "∞") {
    const base = typeof minTarget === "number" ? minTarget : 0;
    // Büyüklüğü yüksek olsa da, aşırı uçmaması için
    // base * (1–4) arası bir çarpan kullanıyoruz.
    const factor = rand(1, 4);
    return base * factor + rand(0, base);
  }

  // Normal aralık: minTarget ile maxTarget arasında ama biraz oynama payı ile
  const spread = (maxTarget - minTarget) || 1;
  let value = rand(minTarget - spread * 0.3, maxTarget + spread * 0.3);

  // Negatif saçmalık olmasın
  if (value < 0) value = Math.abs(value);

  return value;
}

// Tüm ana metrikleri üret
function generateLiveMetrics() {
  const traffic = generateMetricValue(metrics.traffic); // ziyaret/15dk
  const activeUsers = generateMetricValue(metrics.activeUsers);
  const growthRate = generateMetricValue(metrics.growthRate);
  const healthScore = clamp(generateMetricValue(metrics.healthScore), 0, 100);
  const uptime = clamp(generateMetricValue(metrics.uptime), 0, 100);
  const apiLatency = generateMetricValue(metrics.apiLatency);
  const errorRate = generateMetricValue(metrics.errorRate);

  return {
    traffic: Math.round(traffic),
    activeUsers: Math.round(activeUsers),
    growthRate: Number(growthRate.toFixed(1)),
    healthScore: Math.round(healthScore),
    uptime: Number(uptime.toFixed(2)),
    apiLatency: Math.round(apiLatency),
    errorRate: Number(errorRate.toFixed(2)),
  };
}

// Uyarı hesaplama ---------------------------------------

function evaluateAlerts(liveMetrics) {
  const results = [];

  for (const rule of alertRules) {
    const metricKey = rule.condition.metric;
    const operator = rule.condition.operator;
    const value = rule.condition.value;

    const current = liveMetrics[metricKey];

    if (typeof current !== "number") continue;

    let triggered = false;

    switch (operator) {
      case "<":
        triggered = current < value;
        break;
      case "<=":
        triggered = current <= value;
        break;
      case ">":
        triggered = current > value;
        break;
      case ">=":
        triggered = current >= value;
        break;
      case "==":
        triggered = current === value;
        break;
      default:
        break;
    }

    if (triggered) {
      results.push({
        id: rule.id,
        description: rule.description,
        severity: rule.severity,
        metric: metricKey,
        currentValue: current,
        threshold: value,
        suggestionKey: rule.suggestionKey || null,
      });
    }
  }

  return results;
}

// Öneri üretimi -----------------------------------------

function generateSuggestions(liveMetrics, alerts) {
  const suggestions = [];

  // Uyarılara göre özel öneriler
  for (const alert of alerts) {
    if (!alert.suggestionKey) continue;
    const templateList = suggestionTemplates[alert.suggestionKey];
    const text = pickRandom(templateList);
    if (!text) continue;

    suggestions.push({
      source: "alert",
      alertId: alert.id,
      severity: alert.severity,
      text,
    });
  }

  // Genel büyüme / içerik önerileri (her durumda)
  const featureIdea = pickRandom(suggestionTemplates.featureIdeas);
  if (featureIdea) {
    suggestions.push({
      source: "feature",
      text: featureIdea,
    });
  }

  // Metriklere göre kısa yorumlar
  if (liveMetrics.growthRate < 1.5) {
    suggestions.push({
      source: "metric",
      text: "Büyüme oranı düşük görünüyor. Growth katmanında yeni denemeler planla, özellikle organik arama ve içerik tarafına ağırlık ver.",
    });
  } else if (liveMetrics.growthRate > 5) {
    suggestions.push({
      source: "metric",
      text: "Büyüme oranı oldukça yüksek. Bu trendi bozmadan sistem sağlığını korumak için günlük log ve hata takibini ihmal etme.",
    });
  }

  if (liveMetrics.apiLatency > 2000) {
    suggestions.push({
      source: "metric",
      text: "API gecikmesi çok yüksek. Render cold-start gecikmesini azaltmak için arka planda periyodik ping mekanizması kullanabilirsin.",
    });
  }

  if (liveMetrics.uptime < 99) {
    suggestions.push({
      source: "metric",
      text: "Uptime hedefin 99% üzerinde olmalı. Hatalı deploy, restart veya bakım sürelerini gözden geçir.",
    });
  }

  return suggestions;
}

// Ortak özeti (UI'daki büyük metin için) ----------------

function buildOrtakSummary(liveMetrics) {
  const { traffic, activeUsers, growthRate, healthScore } = liveMetrics;
  const mood = calculateMood(growthRate, healthScore);

  let healthText = "dengeli";
  if (healthScore >= 85) healthText = "çok iyi";
  else if (healthScore >= 70) healthText = "iyi";
  else if (healthScore >= 60) healthText = "orta";
  else healthText = "riskli";

  const sentence =
    `Aktif ziyaretçi yaklaşık ${activeUsers}. ` +
    `Son 15 dakikalık trafik ${traffic} civarında. ` +
    `Günlük büyüme ${growthRate.toFixed(1)}%. ` +
    `Sistem sağlık skoru ${healthScore}/100 ve genel durum ${healthText}. ` +
    `Ortak şu anda "${mood}" modunda platformu izliyor ve yeni fırsatlar arıyor.`;

  return { mood, text: sentence };
}

// Komut çalıştırma --------------------------------------

function runCommand(commandId, options = {}) {
  const cmd = commands[commandId];
  if (!cmd) {
    return {
      ok: false,
      error: "Bilinmeyen komut",
      commandId,
    };
  }

  // Şimdilik gerçek işlem yok, sadece akıllı metin döndürüyoruz.
  // Daha sonra burada gerçek analizler, veri sorguları vb. çağrılabilir.
  const now = new Date().toISOString();

  let resultText = "";

  switch (commandId) {
    case "scanPlatform":
      resultText =
        "Tüm katmanlar tarandı. Temel sağlık, büyüme ve servis durumunda kritik bir sorun görünmüyor. Detaylı rapor Kontrol Merkezindeki kartlarda güncellendi.";
      break;
    case "findMissingFeatures":
      resultText =
        "Eksik özellik analizi tamamlandı. Growth ve Sharing katmanları için yeni içerik formatları, referans sistemleri ve mini istatistik panelleri öneriliyor.";
      break;
    case "optimizeGrowth":
      resultText =
        "Büyüme optimizasyonu için aksiyon listesi hazırlandı: yüksek performanslı içeriklerin klonlanması, A/B testli başlık denemeleri ve kayıt akışının sadeleştirilmesi.";
      break;
    case "monitorApiHealth":
      resultText =
        "API sağlık takibi başlatıldı. Render gecikmeleri, hata oranı ve uptime metrikleri 60 saniyede bir kontrol edilip loglanacak.";
      break;
    case "securitySweep":
      resultText =
        "Güvenlik taraması tamamlandı. Olağan dışı istek veya şüpheli IP davranışı tespit edilmesi durumunda uyarı üretilecek.";
      break;
    case "contentInsights":
      resultText =
        "İçerik içgörüleri çıkarıldı. En çok etkileşim alan içerik tipi ve konu etiketleri belirlendi; yeni içerik planı buna göre önerildi.";
      break;
    case "emergencyMode":
      resultText =
        "Acil durum senaryosu aktif. Kritik hata durumunda trafiği güvenli moda almak ve gerektiğinde 'bakım moduna geç' önerisi sunmak üzere izleme yapılıyor.";
      break;
    case "roadmapAdvisor":
      resultText =
        "Yol haritası analizi oluşturuldu. Önce temel sağlık ve büyüme, ardından otomasyon ve sonsuzluk merkezi adımları öneriliyor.";
      break;
    default:
      resultText =
        "Komut başarıyla işlendi. İlgili katmanlar için detaylı rapor ve öneriler güncellendi.";
  }

  return {
    ok: true,
    id: cmd.id,
    label: cmd.label,
    description: cmd.description,
    categories: cmd.categories || [],
    executedAt: now,
    resultText,
    options,
  };
}

// Ortak durum özeti (API endpoint için) -----------------

function getOrtakStatus() {
  const liveMetrics = generateLiveMetrics();
  const alerts = evaluateAlerts(liveMetrics);
  const suggestions = generateSuggestions(liveMetrics, alerts);
  const summary = buildOrtakSummary(liveMetrics);

  return {
    meta,
    goals,
    roadmap,
    layers,
    intelligence,
    liveMetrics,
    alerts,
    suggestions,
    summary,
    timestamp: new Date().toISOString(),
  };
}

// Dışa aktarma ------------------------------------------

module.exports = {
  getOrtakStatus,
  runCommand,
  // config’ten doğrudan erişmek isteyebileceğin şeyleri de dışa atalım:
  meta,
  goals,
  layers,
  metrics,
  commands,
  roadmap,
  intelligence,
};
