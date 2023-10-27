const Room = require("../../models/room");
const { ctrlWrapper } = require("../../decorators");

const addRoom = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Room.create({
    ...req.body,
    owner,
  });

  console.log(result);

  res.status(201).json(result);
};

module.exports = {
  addRoom: ctrlWrapper(addRoom),
};
