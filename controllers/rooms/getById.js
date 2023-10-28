const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getById = async (req, res) => {
  const { id: roomId } = req.params;

  const result = await Room.findOne({ _id: roomId }, "").populate(
    "owner",
    "name avatarURL"
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
