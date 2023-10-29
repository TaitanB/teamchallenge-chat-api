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
  { versionKey: false, timestamps: true }
);

msgSchema.post("save", handleMongooseError);

const Message = model("message", msgSchema);

module.exports = Message;
