import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "superAdmin"],
    },
    deleteAt: {
      type: Date,
      default: null,
    },
    blockedAt: {
      type: Date,
      default: null,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    coursesRegistered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;
