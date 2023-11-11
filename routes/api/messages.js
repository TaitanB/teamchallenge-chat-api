const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const {
  addMsg,
  //   editMsg,
  //   replyToMsg,
  deleteById,
  getAllMsgByRoom,
} = require("../../controllers/messages");

const { msgSchema } = require("../../schemas/messages");
const { validateBody } = require("../../decorators");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/:id", authenticate, isValidId, validateBody(msgSchema), addMsg);

// router.patch(
//   "/:roomId/:msgId",
//   authenticate,
//   isValidId,
//   validateBody(msgSchema),
//   replyToMsg
// );

router.get("/:id", authenticate, isValidId, getAllMsgByRoom);

// router.patch(
//   "/:id",
//   authenticate,
//   isValidId,
//   validateBody(msgSchema),
//   editMsg
// );

router.delete("/:id", authenticate, isValidId, deleteById);

module.exports = router;
