const Room = require("../../models/room");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const editById = async (req, res) => {
  const { id: roomId } = req.params;
  const { _id: owner } = req.user;
  const { title, description } = req.body;

  const roomToUpdate = await Room.findOneAndUpdate(
    {
      $and: [{ _id: roomId, owner }],
    },
    { title, description },
    { new: true }
  ).populate("owner", "_id name avatarURL");

  if (!roomToUpdate) {
    throw HttpError(404, "Room not found");
  }

  await roomToUpdate.save();

  res.json(roomToUpdate);
};

module.exports = {
  editById: ctrlWrapper(editById),
};
