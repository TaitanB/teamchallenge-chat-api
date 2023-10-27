const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const editById = async (req, res) => {
  const { roomId } = req.params;
  const { _id: owner } = req.user;
  const { title, description } = req.body;

  const roomToUpdate = await Room.findOneAndUpdate(
    {
      $and: [{ _id: roomId, owner }],
    },
    { title, description },
    { new: true }
  );

  if (!roomToUpdate) {
    throw HttpError(404, "Todo not found");
  }

  await roomToUpdate.save();

  res.json(roomToUpdate);
};

module.exports = {
  editById: ctrlWrapper(editById),
};
