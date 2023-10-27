const { HttpError } = require("../helpers");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { ApiKey = "" } = req.headers;
  const token = ApiKey.trim();

  try {
    const user = await User.findOne({ token });

    if (!user) {
      next(HttpError(401, "This user does not exist"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(HttpError(401, "This token is invalid"));
  }
};

module.exports = authenticate;
