// modules/paymentsGateway/iyzico.js

// Bu dosya gerçek iyzico entegrasyonu için altyapıdır.
// Şu an TEST modundadır.

export async function createPaymentSession(orderData) {
  // Normalde iyzico API'ye istek gider
  return {
    success: true,
    iyzicoPaymentId: "TEST_PAYMENT_12345",
    redirectUrl: "https://sandbox-iyzico/redirect/test",
  };
}

export async function verifyPaymentStatus(paymentId) {
  // Normalde iyzico'dan ödeme sonucu alınır
  return {
    success: true,
    status: "paid",
  };
}
