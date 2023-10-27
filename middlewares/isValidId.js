const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { roomId } = req.params;

  if (!isValidObjectId(roomId)) {
    next(HttpError(400, `${roomId} is not valid id`));
  }

  next();
};

module.exports = isValidId;
