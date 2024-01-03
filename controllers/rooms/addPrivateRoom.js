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

  const queryParameters = [];

  queryParameters.$or = [{ owner: owner }, { users: owner }];

  const result = await Room.find(
    { ...queryParameters, type: "private" },
    "",
    {}
  );

  const room = result.find((room) =>
    room.users.some((user) => user.toString() === guest.toString())
  );

  if (!room) {
    const room = await Room.create({
      title: user.name,
      type: "private",
      img: user.avatarURL,
      owner,
    });

    room.users.push(guest, owner);

    room.save();

    res.status(201).json(room);
  } else {
    res.status(200).json({
      message: "Private room with this guest already exists!",
      roomId: room._id,
    });
  }
};

module.exports = {
  addPrivateRoom: ctrlWrapper(addPrivateRoom),
};
