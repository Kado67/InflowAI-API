// modules/users/controller.js
// Express controller – request/response burada

import * as userService from "./service.js";

// TÜM KULLANICILAR
export async function getUsers(req, res, next) {
  try {
    const users = await userService.listUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

// TEK KULLANICI
export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı.",
      });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// 🔥 PUBLIC REGISTER – /api/users/register
export async function register(req, res, next) {
  try {
    // İstersen burada ekstra validation, default role vs. yapabilirsin
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

// (GENEL CREATE – admin panel vs. için)
// POST /api/users
export async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// GÜNCELLE
export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı.",
      });
    }

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

// SİL
export async function removeUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Kullanıcı bulunamadı.",
      });
    }

    res.json({ success: true, message: "Kullanıcı silindi." });
  } catch (err) {
    next(err);
  }
}
