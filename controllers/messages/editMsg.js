const Message = require("../../models/message");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const editMsg = async (req, res) => {
  const { id: msgId } = req.params;
  const { _id: owner } = req.user;
  const { content } = req.body;

  const msgToUpdate = await Message.findOneAndUpdate(
    {
      $and: [{ _id: msgId, owner }],
    },
    { content },
    { new: true }
  ).populate("owner", "_id name avatarURL");

  if (!msgToUpdate) {
    throw HttpError(404, "Message not found");
  }

  await msgToUpdate.save();

  res.json(msgToUpdate);
};

module.exports = {
  editMsg: ctrlWrapper(editMsg),
};
