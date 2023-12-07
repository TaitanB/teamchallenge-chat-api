const Room = require("../../models/room");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters } = require("../../helpers");

const getAllRooms = async (req, res) => {
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  const total = await Room.countDocuments(queryParameters);

  const totalPages = Math.ceil(total / perPage);

  const result = await Room.find(queryParameters, "", {
    skip,
    limit,
  }).sort({
    updatedAt: -1,
  });

  res.status(200).json({ page, perPage, totalPages, rooms: result });
};

module.exports = {
  getAllRooms: ctrlWrapper(getAllRooms),
};
