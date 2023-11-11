const Message = require("../../models/message");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const deleteById = async (req, res) => {
  const { id: msgId } = req.params;
  const { _id: owner } = req.user;

  const result = await Message.findOneAndRemove({
    $and: [{ _id: msgId }, { owner }],
  });

  if (!result) {
    throw HttpError(404, "Message not found");
  }

  res.json({
    message: "Message deleted",
    deletedId: msgId,
  });
};

module.exports = {
  deleteById: ctrlWrapper(deleteById),
};
