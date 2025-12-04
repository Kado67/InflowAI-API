// modules/users/service.js
// Veritabanı ile konuşan katman (iş mantığı)

import User from "./model.js"; // ← DÜZELTİLMİŞ SATIR

export async function listUsers() {
  return User.find({ isDeleted: false }).select("-password").lean();
}

export async function getUserById(id) {
  return User.findOne({ _id: id, isDeleted: false }).select("-password").lean();
}

export async function createUser(data) {
  // Şimdilik basit oluşturma – şifre hash işlemini auth tarafı yapıyor
  const user = await User.create(data);
  const obj = user.toObject();
  delete obj.password;
  return obj;
}

export async function updateUser(id, data) {
  if (data.password) {
    // Güvenlik için buradan şifre güncellemeyelim
    delete data.password;
  }

  const user = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  ).select("-password");

  return user;
}

export async function deleteUser(id) {
  // Soft delete
  const user = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, isActive: false },
    { new: true }
  ).select("-password");

  return user;
}
