const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const msgSchema = new Schema(
  {
    content: {
      type: String,
      max: 300,
      required: [true],
    },
    replys: {
      type: [
        {
          content: {
            type: String,
            max: 300,
            required: [true],
          },
          owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
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
  { versionKey: false, timestamps: true, expires: "1d" }
);

// .index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 })

msgSchema.index({ content: "text" });

msgSchema.post("save", handleMongooseError);

const Message = model("message", msgSchema);

module.exports = Message;
