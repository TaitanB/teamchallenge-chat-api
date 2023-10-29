const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");
const { topicsEnum } = require("../constants/constants");

const roomSchema = new Schema(
  {
    title: {
      type: String,
      min: 4,
      max: 30,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      max: 300,
    },
    type: {
      type: String,
      enam: ["public", "private"],
      required: [true, "Type is required"],
    },
    topic: {
      type: String,
      enam: Object.values(topicsEnum),
      required: function () {
        return this.type === "public";
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    users: [String],
  },
  { versionKey: false, timestamps: true }
);

roomSchema.post("save", handleMongooseError);

const Room = model("room", roomSchema);

module.exports = Room;
