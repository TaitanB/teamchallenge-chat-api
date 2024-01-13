const Room = require("../../models/room");
const User = require("../../models/user");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters, changeInfoMember } = require("../../helpers");

const getPrivate = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage, query } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  queryParameters.type = "private";

  const userConditions = [];

  if (query) {
    const usersFinded = await User.find({ name: query }, "_id");

    const userIds = usersFinded.map((user) => user._id);

    userConditions.push({
      users: { $in: userIds },
      $or: [{ owner: owner }, { users: owner }],
    });
  } else {
    userConditions.push({
      $or: [{ owner: owner }, { users: owner }],
    });
  }

  if (userConditions.length > 0) {
    queryParameters.$and = userConditions;
  }

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
