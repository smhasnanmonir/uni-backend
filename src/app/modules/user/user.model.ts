import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";

export const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["inProcessing", "blocked"],
      required: true,
      default: "inProcessing",
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // console.log(this, "pre save middleware");
  this.password = await bcrypt.hash(this.password, Number(config.passwordHash));
  next();
});

//post save middleware configuration
userSchema.post("save", function (doc, next) {
  doc.password = "";
  console.log(this, "post save middleware");
  next();
});

//query middleware

userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const User = model<TUser>("User", userSchema);
