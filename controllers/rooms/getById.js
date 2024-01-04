const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");
const { changeInfoMember } = require("../../helpers");

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

  await room.populate("users", "_id name avatarURL");

  if (room.type === "public") {
    res.json(room);
  } else {
    const user = room.users.find(
      (user) => user._id.toString() === owner.toString()
    );
    if (!user) {
      throw HttpError(404, "User not found");
    }

    changeInfoMember(room, owner);

    res.json(room);
  }
};

module.exports = {
  getById: ctrlWrapper(getById),
};
