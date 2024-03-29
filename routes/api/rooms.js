const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const {
  addPublicRoom,
  addPrivateRoom,
  editById,
  deleteById,
  getAllPublic,
  getById,
  getRoomUsers,
  getPublicOwner,
  getPrivate,
  getPublicNotOwn,
} = require("../../controllers/rooms");

const { roomAddSchema, roomEditSchema } = require("../../schemas/rooms");
const { validateBody } = require("../../decorators");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/public", getAllPublic);

router.get("/public/owner", authenticate, getPublicOwner);

router.get("/private", authenticate, getPrivate);

router.get("/public/notown", authenticate, getPublicNotOwn);

router.get("/:id", authenticate, isValidId, getById);

router.get("/:id/users", authenticate, isValidId, getRoomUsers);

router.post(
  "/public",
  authenticate,
  validateBody(roomAddSchema),
  addPublicRoom
);

router.post("/private/:id", authenticate, isValidId, addPrivateRoom);

router.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(roomEditSchema),
  editById
);

router.delete("/:id", authenticate, isValidId, deleteById);

module.exports = router;
