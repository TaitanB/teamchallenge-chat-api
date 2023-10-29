const Room = require("../../models/room");
const { ctrlWrapper } = require("../../decorators");

const addRoom = async (req, res) => {
  const { _id: owner } = req.user;
  const { type } = req.body;
  const { guest } = req.query;

  // додати перевірку ід гостя

  const room = await Room.create({
    ...req.body,
    owner,
  });

  if (guest !== undefined) {
    if (type === "private") {
      room.users.push(guest, owner);
    }
    room.save();
  }

  res.status(201).json(room);
};

module.exports = {
  addRoom: ctrlWrapper(addRoom),
};
