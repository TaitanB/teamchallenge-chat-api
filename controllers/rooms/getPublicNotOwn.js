const Room = require("../../models/room");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters } = require("../../helpers");

const getPublicNotOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query, owner);

  const total = await Room.countDocuments({
    ...queryParameters,
    type: "public",
    owner: { $ne: owner },
  });

  const totalPages = Math.ceil(total / perPage);

  const result = await Room.find(
    {
      ...queryParameters,
      type: "public",
      owner: { $ne: owner },
    },
    "",
    {
      skip,
      limit,
    }
  ).sort({ createdAt: 1 });

  res.status(200).json({ page, perPage, totalPages, rooms: result });
};

module.exports = {
  getPublicNotOwn: ctrlWrapper(getPublicNotOwn),
};
