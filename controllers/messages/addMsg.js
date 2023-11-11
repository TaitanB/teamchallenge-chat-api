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

  const room = await Room.findOne({ _id: roomId }, "").populate(
    "owner",
    "_id name avatarURL"
  );

  // const room = await Room.findOneAndUpdate(
  //   {
  //     roomId,
  //   },
  //   { $addToSet: { users: owner } }
  // );

  if (!room) {
    throw HttpError(404, "Room not found");
  }

  const user = room.users.find((user) => user === owner.toString());

  if (!user) {
    room.users.push(owner);
  }

  await room.save();
  console.log(result);
  res.status(201).json({ msg: result, room: room.title });
};

module.exports = {
  addMsg: ctrlWrapper(addMsg),
};
