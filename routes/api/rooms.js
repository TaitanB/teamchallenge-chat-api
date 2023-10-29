const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const {
  addRoom,
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

router.get("/:roomId", authenticate, isValidId, getById);

router.post("/", authenticate, validateBody(roomAddSchema), addRoom);

router.patch(
  "/:roomId",
  authenticate,
  isValidId,
  validateBody(roomEditSchema),
  editById
);

router.delete("/:roomId", authenticate, isValidId, deleteById);

module.exports = router;
