const Room = require("../../models/room");
const { perPage } = require("../../constants/constants");
const { ctrlWrapper } = require("../../decorators");
const { getQueryParameters } = require("../../helpers");

const getPrivate = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = perPage } = req.query;
  const skip = (page - 1) * limit;

  const queryParameters = getQueryParameters(req.query);

  queryParameters.type = "private";
  queryParameters.$or = [{ owner: owner }, { users: owner }];

  const total = await Room.countDocuments(queryParameters);

  const totalPages = Math.ceil(total / perPage);

  let rooms = await Room.find(queryParameters, "", {
    skip,
    limit,
  })
    .populate("owner", "_id name avatarURL")
    .populate("users", "_id name avatarURL")
    .sort({ updatedAt: -1 });

  rooms = rooms.map((room) => {
    const otherUser = room.users.find(
      (user) => String(user._id) !== String(owner)
    );
    room.title = otherUser ? otherUser.name : "Private Room";
    return room;
  });

  res.status(200).json({ page, perPage, totalPages, rooms: rooms });
};

module.exports = {
  getPrivate: ctrlWrapper(getPrivate),
};
