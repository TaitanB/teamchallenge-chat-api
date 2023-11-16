const { Schema, model } = require("mongoose");
const { textRegex } = require("../constants/constants");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    token: {
      type: String,
    },
    name: {
      type: String,
      match: textRegex,
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

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
