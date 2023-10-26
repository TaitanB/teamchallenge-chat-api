const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const { nameRegex } = require("../constants/constants");

const userSchema = new Schema(
  {
    token: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      match: nameRegex,
      required: [true, "Name is required"],
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
