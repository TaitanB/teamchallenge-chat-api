const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    token: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      min: 2,
      max: 26,
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
