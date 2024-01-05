const gravatar = require("gravatar");
const { v4 } = require("uuid");

const User = require("../../models/user");
const { ctrlWrapper } = require("../../decorators");

const register = async (req, res) => {
  const { name } = req.body;

  const token = v4();

  const avatarURL = gravatar.url(token, { d: "wavatar" });

  const newUser = await User.create({
    name,
    avatarURL,
  });

  const { _id: id } = newUser;

  await User.findByIdAndUpdate(id, { token, newUser });

  res.status(201).json({
    token,
    user: {
      _id: id,
      name: newUser.name,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
