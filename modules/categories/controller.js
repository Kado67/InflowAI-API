import CategoryService from "./service.js";

export default {
  async createCategory(req, res) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json({ success: true, category });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json({ success: true, categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getCategory(req, res) {
    try {
      const category = await CategoryService.getCategory(req.params.id);
      if (!category) return res.status(404).json({ success: false, message: "Kategori bulunamadı" });
      res.json({ success: true, category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateCategory(req, res) {
    try {
      const category = await CategoryService.updateCategory(req.params.id, req.body);
      res.json({ success: true, category });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async deleteCategory(req, res) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      res.json({ success: true, message: "Kategori silindi" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};
