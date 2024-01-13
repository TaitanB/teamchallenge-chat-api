const { Schema, model } = require("mongoose");
const { nameRegex } = require("../constants/constants");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    token: {
      type: String,
    },
    name: {
      type: String,
      match: nameRegex,
      min: 2,
      max: 30,
      required: [true, "Name is required"],
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.index({ name: "text" });

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
