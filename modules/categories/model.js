import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
