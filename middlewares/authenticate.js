const { HttpError } = require("../helpers");
const User = require("../models/user");

const authenticate = async (req, res, next) => {
  const { apikey = "" } = req.headers;

  if (!apikey) {
    next(HttpError(401, "Token is missing"));
  }

  const token = apikey && apikey.trim();

  try {
    const user = await User.findOne({ token });

    if (!user || !user.token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(HttpError(401, "This token is invalid"));
  }
};

module.exports = authenticate;
