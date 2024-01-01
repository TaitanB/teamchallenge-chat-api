const Room = require("../../models/room");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters } = require("../../helpers");

const getAllPublic = async (req, res) => {
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  const total = await Room.countDocuments({
    ...queryParameters,
    type: "public",
  });

  const totalPages = Math.ceil(total / perPage);

  const result = await Room.find(
    { ...queryParameters, type: "public" },
    "-owner -users",
    {
      skip,
      limit,
    }
  ).sort({
    createdAt: 1,
  });

  res.status(200).json({ page, perPage, totalPages, rooms: result });
};

module.exports = {
  getAllPublic: ctrlWrapper(getAllPublic),
};
