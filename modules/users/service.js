// modules/users/service.js

const User = require('./model');

async function getProfile(userId) {
  return User.findById(userId).select("-password");
}

async function updateProfile(userId, data) {
  return User.findByIdAndUpdate(userId, data, { new: true })
    .select("-password");
}

async function addAddress(userId, addressData) {
  const user = await User.findById(userId);
  user.addresses.push(addressData);
  await user.save();
  return user.addresses;
}

async function updateAddress(userId, addressId, data) {
  const user = await User.findById(userId);

  const addr = user.addresses.id(addressId);
  if (!addr) throw new Error("Adres bulunamadı.");

  Object.assign(addr, data);
  await user.save();
  return addr;
}

async function deleteAddress(userId, addressId) {
  const user = await User.findById(userId);

  const addr = user.addresses.id(addressId);
  if (!addr) throw new Error("Adres bulunamadı.");

  addr.deleteOne();
  await user.save();
  return true;
}

async function listAddresses(userId) {
  const user = await User.findById(userId);
  return user.addresses;
}

module.exports = {
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  listAddresses,
};
