const Message = require("../../models/message");
const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const addMsg = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: roomId } = req.params;

  const result = await Message.create({
    ...req.body,
    owner,
    roomId,
  });

  result.populate("owner", "_id name avatarURL");

  const room = await Room.findOne({ _id: roomId }, "").populate(
    "owner",
    "_id name avatarURL"
  );

  if (!room) {
    throw HttpError(404, "Room not found");
  }

  const user = room.users.find((user) => user.toString() === owner.toString());

  if (!user) {
    room.users.push(owner);
  }

  await room.save();

  res.status(201).json({ msg: result, room: room.title });
};

module.exports = {
  addMsg: ctrlWrapper(addMsg),
};
