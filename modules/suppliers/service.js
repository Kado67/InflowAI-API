// modules/suppliers/service.js

import Supplier from "./model.js";

export default {
  async createSupplier(data) {
    return await Supplier.create(data);
  },

  async getSuppliers() {
    return await Supplier.find().sort({ createdAt: -1 });
  },

  async getSupplier(id) {
    return await Supplier.findById(id);
  },

  async updateSupplier(id, data) {
    return await Supplier.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteSupplier(id) {
    return await Supplier.findByIdAndDelete(id);
  },
};
