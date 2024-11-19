import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["company", "college", "student"],
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
