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

router.get("/:id", authenticate, isValidId, getAllMsgByRoom);

router.delete("/:id", authenticate, isValidId, deleteById);

// router.patch(
//   "/:roomId/:msgId",
//   authenticate,
//   isValidId,
//   validateBody(msgSchema),
//   replyToMsg
// );

// router.patch(
//   "/:id",
//   authenticate,
//   isValidId,
//   validateBody(msgSchema),
//   editMsg
// );

module.exports = router;
