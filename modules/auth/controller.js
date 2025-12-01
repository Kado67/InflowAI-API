// modules/auth/controller.js

import * as AuthService from "./service.js";

export async function register(req, res, next) {
  try {
    const data = await AuthService.register(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const data = await AuthService.login({
      email: req.body.email,
      password: req.body.password,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    await AuthService.logout(req.user.sub, req.body.refreshToken);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function refreshTokens(req, res, next) {
  try {
    const data = await AuthService.refreshTokens(
      req.body.refreshToken,
      req.headers["user-agent"],
      req.ip
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
}
