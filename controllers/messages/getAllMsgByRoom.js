const Message = require("../../models/message");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters } = require("../../helpers");

const getAllMsgByRoom = async (req, res) => {
  const { roomId } = req.params;

  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);
  console.log(queryParameters);

  if (roomId) {
    queryParameters.roomId = roomId;
  }

  const total = await Message.countDocuments(queryParameters);

  const totalPages = Math.ceil(total / perPage);

  const result = await Message.find(queryParameters, "-updatedAt", {
    skip,
    limit,
  }).sort({ createdAt: -1 });

  res.status(200).json({ page, perPage, totalPages, messages: result });
};

module.exports = {
  getAllMsgByRoom: ctrlWrapper(getAllMsgByRoom),
};
