const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getRoomUsers = async (req, res) => {
  const { id: roomId } = req.params;

  const room = await Room.findOne({ _id: roomId });

  if (!room) {
    throw HttpError(404, "Room not found");
  }

  await room.populate("users", "_id name avatarURL");

  res.json(room.users);
};

module.exports = {
  getRoomUsers: ctrlWrapper(getRoomUsers),
};
