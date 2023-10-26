const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  const { _id, name, avatarURL } = req.user;

  res.json({
    _id,
    name,
    avatarURL,
  });
};

module.exports = {
  current: ctrlWrapper(current),
};
