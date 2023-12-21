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

  const result = await Room.find({ owner, type: "private" }, "", {});

  result.find((room) => room.users._id === guest);

  if (result.length === 0) {
    const room = await Room.create({
      title: user.name,
      type: "private",
      owner,
    });

    room.users.push(guest, owner);

    room.save();

    res.status(201).json(room);
  } else {
    res.json({ message: "Private room with this guest already exists!" });
  }
};

module.exports = {
  addPrivateRoom: ctrlWrapper(addPrivateRoom),
};
