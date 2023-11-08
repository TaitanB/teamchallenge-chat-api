const { addRoom } = require("./addRoom");
const { editById } = require("./editById");
const { deleteById } = require("./deleteById");
const { getAllPublic } = require("./getAllPublic");
const { getAllOwner } = require("./getAllOwner");
const { getById } = require("./getById");
const { joinRoom } = require("./joinRoom");

module.exports = {
  addRoom,
  editById,
  deleteById,
  getAllPublic,
  getAllOwner,
  getById,
  joinRoom,
};
