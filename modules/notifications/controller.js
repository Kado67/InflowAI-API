// modules/notifications/controller.js

import NotificationService from "./service.js";

export default {
  async create(req, res) {
    try {
      const notif = await NotificationService.createNotification(
        req.user.id,
        req.body
      );

      res.status(201).json({ success: true, notification: notif });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async listMine(req, res) {
    try {
      const list = await NotificationService.listUserNotifications(
        req.user.id
      );

      res.json({ success: true, notifications: list });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async markAsRead(req, res) {
    try {
      const notif = await NotificationService.markAsRead(
        req.user.id,
        req.params.id
      );

      res.json({ success: true, notification: notif });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async markAll(req, res) {
    try {
      await NotificationService.markAllAsRead(req.user.id);
      res.json({ success: true, message: "Tüm bildirimler okundu işaretlendi" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async sendToAll(req, res) {
    try {
      if (req.user.role !== "admin")
        return res.status(403).json({ success: false, message: "Yetkin yok" });

      const notif = await NotificationService.adminSendToAll(req.body);
      res.status(201).json({ success: true, notification: notif });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
