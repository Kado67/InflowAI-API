// modules/users/controller.js

const userService = require('./service');

async function getProfile(req, res) {
  try {
    const profile = await userService.getProfile(req.user.id);

    return res.json({
      success: true,
      data: profile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateProfile(req, res) {
  try {
    const updated = await userService.updateProfile(req.user.id, req.body);

    return res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function addAddress(req, res) {
  try {
    const list = await userService.addAddress(req.user.id, req.body);

    return res.json({
      success: true,
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateAddress(req, res) {
  try {
    const updated = await userService.updateAddress(
      req.user.id,
      req.params.addressId,
      req.body
    );

    return res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function deleteAddress(req, res) {
  try {
    await userService.deleteAddress(req.user.id, req.params.addressId);

    return res.json({
      success: true,
      message: "Adres silindi.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function listAddresses(req, res) {
  try {
    const list = await userService.listAddresses(req.user.id);

    return res.json({
      success: true,
      data: list,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  listAddresses,
};
