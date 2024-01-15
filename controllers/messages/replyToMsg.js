const Message = require("../../models/message");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const replyToMsg = async (req, res) => {
  const { id: msgId } = req.params;
  const { _id: user } = req.user;
  const { content } = req.body;

  const reply = { content, owner: user, createdAt: new Date() };

  const msgToUpdate = await Message.findOneAndUpdate(
    { _id: msgId },
    { $push: { replys: reply } },
    { new: true }
  )
    .populate("owner", "_id name avatarURL")
    .populate("replys.owner", "_id name avatarURL");

  if (!msgToUpdate) {
    throw HttpError(404, "Message not found");
  }

  await msgToUpdate.save();

  res.json(msgToUpdate);
};

module.exports = {
  replyToMsg: ctrlWrapper(replyToMsg),
};
