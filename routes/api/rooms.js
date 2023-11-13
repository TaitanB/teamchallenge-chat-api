const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const {
  addPublicRoom,
  addPrivateRoom,
  editById,
  deleteById,
  getAllPublic,
  getAllOwner,
  getById,
} = require("../../controllers/rooms");

const { roomAddSchema, roomEditSchema } = require("../../schemas/rooms");
const { validateBody } = require("../../decorators");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/public", getAllPublic);

router.get("/owner", authenticate, getAllOwner);

router.get("/:id", authenticate, isValidId, getById);

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
