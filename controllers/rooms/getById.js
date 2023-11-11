const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getById = async (req, res) => {
  const { id: roomId } = req.params;
  const { _id: owner } = req.user;

  const room = await Room.findOne({ _id: roomId }, "").populate(
    "owner",
    "_id name avatarURL"
  );

  if (!room) {
    throw HttpError(404, "Room not found");
  }

  if (room.type === "public") {
    res.json(room);
  } else {
    const user = room.users.find((user) => user === owner.toString());

    if (!user) {
      throw HttpError(404, "User not found");
    }
    res.json(room);
  }
};

module.exports = {
  getById: ctrlWrapper(getById),
};
