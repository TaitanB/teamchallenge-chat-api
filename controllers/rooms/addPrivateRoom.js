const Room = require("../../models/room");
const User = require("../../models/user");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const addPrivateRoom = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: guest } = req.params;

  const user = await User.findOne({ _id: guest }, "");

  if (!user) {
    throw HttpError(404, "Guest not found");
  }

  const room = await Room.create({
    ...req.body,
    owner,
  });

  room.users.push(guest, owner);

  room.save();

  res.status(201).json(room);
};

module.exports = {
  addPrivateRoom: ctrlWrapper(addPrivateRoom),
};
