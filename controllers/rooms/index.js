const { addPublicRoom } = require("./addPublicRoom");
const { addPrivateRoom } = require("./addPrivateRoom");
const { editById } = require("./editById");
const { deleteById } = require("./deleteById");
const { getAllPublic } = require("./getAllPublic");
const { getAllOwner } = require("./getAllOwner");
const { getById } = require("./getById");
const { getRoomUsers } = require("./getRoomUsers");

const { joinRoom } = require("./joinRoom");

module.exports = {
  addPublicRoom,
  addPrivateRoom,
  editById,
  deleteById,
  getAllPublic,
  getAllOwner,
  getById,
  getRoomUsers,
  joinRoom,
};
