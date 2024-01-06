const Room = require("../../models/room");
const { ctrlWrapper } = require("../../decorators");
const gravatar = require("gravatar");
const { v1 } = require("uuid");

const addPublicRoom = async (req, res) => {
  const { _id: owner } = req.user;

  const imgId = v1();

  const imgURL = gravatar.url(imgId, { d: "identicon", s: 480 });

  const room = await Room.create({
    ...req.body,
    owner,
    img: imgURL,
  });

  res.status(201).json(room);
};

module.exports = {
  addPublicRoom: ctrlWrapper(addPublicRoom),
};
