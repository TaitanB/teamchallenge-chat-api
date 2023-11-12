const Room = require("../../models/room");
const { ctrlWrapper } = require("../../decorators");

const addPublicRoom = async (req, res) => {
  const { _id: owner } = req.user;

  const room = await Room.create({
    ...req.body,
    owner,
  });

  res.status(201).json(room);
};

module.exports = {
  addPublicRoom: ctrlWrapper(addPublicRoom),
};
