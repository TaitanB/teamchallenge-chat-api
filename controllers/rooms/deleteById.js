const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const deleteById = async (req, res) => {
  const { id: roomId } = req.params;
  const { _id: owner } = req.user;

  const result = await Room.findOneAndRemove({
    $and: [{ _id: roomId }, { owner }],
  });

  if (!result) {
    throw HttpError(404, "Room not found");
  }

  res.json({
    message: "Room deleted",
    deletedId: roomId,
  });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
