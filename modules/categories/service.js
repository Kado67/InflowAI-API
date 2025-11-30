import Category from "./model.js";
import slugify from "slugify";

export default {
  async createCategory(data) {
    const slug = slugify(data.name, { lower: true });

    const exists = await Category.findOne({ slug });
    if (exists) throw new Error("Bu kategori zaten var");

    return await Category.create({ ...data, slug });
  },

  async getAllCategories() {
    return await Category.find().sort({ createdAt: -1 });
  },

  async getCategory(id) {
    return await Category.findById(id);
  },

  async updateCategory(id, data) {
    if (data.name) data.slug = slugify(data.name, { lower: true });
    return await Category.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteCategory(id) {
    return await Category.findByIdAndDelete(id);
  }
};
