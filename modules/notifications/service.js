// modules/notifications/service.js

import Notification from "./model.js";

export default {
  async createNotification(userId, data) {
    return await Notification.create({
      user: userId,
      title: data.title,
      message: data.message,
      type: data.type || "system",
    });
  },

  async listUserNotifications(userId) {
    return await Notification.find({ user: userId })
      .sort({ createdAt: -1 });
  },

  async markAsRead(userId, notifId) {
    const notif = await Notification.findOne({
      _id: notifId,
      user: userId,
    });

    if (!notif) throw new Error("Bildirim bulunamadı");

    notif.isRead = true;
    await notif.save();

    return notif;
  },

  async markAllAsRead(userId) {
    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true }
    );

    return true;
  },

  async adminSendToAll(data) {
    return await Notification.create({
      user: null, // broadcast
      title: data.title,
      message: data.message,
      type: data.type || "system",
    });
  }
};
