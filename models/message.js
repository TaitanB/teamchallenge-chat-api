const { Schema, model } = require("mongoose");
const { textRegex } = require("../constants/constants");
const { handleMongooseError } = require("../helpers");

const msgSchema = new Schema(
  {
    content: {
      type: String,
      match: textRegex,
      max: 1000,
      required: [true],
    },
    replys: {
      type: [
        {
          content: {
            type: String,
            match: textRegex,
            max: 300,
            required: true,
          },
          owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
          },
          createdAt: {
            type: Date,
          },
        },
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

msgSchema.index({ createdAt: 1 }, { expireAfterSeconds: 14 * 24 * 60 * 60 });

msgSchema.index({ content: "text" });

msgSchema.post("save", handleMongooseError);

const Message = model("message", msgSchema);

module.exports = Message;
