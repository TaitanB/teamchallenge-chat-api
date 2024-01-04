const Room = require("../../models/room");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters, changeInfoMember } = require("../../helpers");

const getPrivate = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  queryParameters.type = "private";
  queryParameters.$or = [{ owner: owner }, { users: owner }];

  const total = await Room.countDocuments(queryParameters);

  const totalPages = Math.ceil(total / perPage);

  const result = await Room.find(queryParameters, "", {
    skip,
    limit,
  })
    .populate("owner", "_id name avatarURL")
    .populate("users", "_id name avatarURL")
    .sort({ updatedAt: -1 });

  const rooms = result.map((room) => changeInfoMember(room, owner));

  res.status(200).json({ page, perPage, totalPages, rooms: rooms });
};

module.exports = {
  getPrivate: ctrlWrapper(getPrivate),
};
