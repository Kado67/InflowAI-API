// modules/shipping/controller.js

import ShippingService from "./service.js";

export default {
  async create(req, res) {
    try {
      const company = await ShippingService.createCompany(req.body);
      res.status(201).json({ success: true, company });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async list(req, res) {
    try {
      const list = await ShippingService.listCompanies();
      res.json({ success: true, companies: list });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async get(req, res) {
    try {
      const company = await ShippingService.getCompany(req.params.id);
      res.json({ success: true, company });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const company = await ShippingService.updateCompany(
        req.params.id,
        req.body
      );

      res.json({ success: true, company });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await ShippingService.deleteCompany(req.params.id);

      res.json({ success: true, message: "Kargo firması silindi" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async assign(req, res) {
    try {
      const order = await ShippingService.assignShippingToOrder(
        req.params.orderId,
        req.body
      );

      res.json({ success: true, order });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
