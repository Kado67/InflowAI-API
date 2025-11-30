// modules/suppliers/controller.js

import SupplierService from "./service.js";

export default {
  async create(req, res) {
    try {
      const supplier = await SupplierService.createSupplier(req.body);
      res.status(201).json({ success: true, supplier });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async list(req, res) {
    try {
      const suppliers = await SupplierService.getSuppliers();
      res.json({ success: true, suppliers });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async get(req, res) {
    try {
      const supplier = await SupplierService.getSupplier(req.params.id);
      if (!supplier)
        return res.status(404).json({ success: false, message: "Tedarikçi bulunamadı" });

      res.json({ success: true, supplier });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const supplier = await SupplierService.updateSupplier(req.params.id, req.body);
      res.json({ success: true, supplier });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await SupplierService.deleteSupplier(req.params.id);
      res.json({ success: true, message: "Tedarikçi silindi" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },
};
