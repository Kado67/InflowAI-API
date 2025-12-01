import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: { type: String },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },

    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// *** BUNLAR OLMADAN Render çalışmaz ***
export default User;
export { User };
