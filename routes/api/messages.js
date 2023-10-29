const express = require("express");
const isValidId = require("../../middlewares/isValidId");

const {
  addMsg,
  //   editMsg,
  //   replyToMsg,
  //   deleteById,
  //   getAllMsgByRoom,
} = require("../../controllers/messages");

const { msgSchema } = require("../../schemas/messages");
const { validateBody } = require("../../decorators");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/:roomId",
  authenticate,
  isValidId,
  validateBody(msgSchema),
  addMsg
);

// router.get(
//   "/:roomId/:msgId",
//   authenticate,
//   isValidId,
//   validateBody(msgSchema),
//   replyToMsg
// );

// router.get("/:roomId", authenticate, isValidId, getAllMsgByRoom);

// router.patch(
//   "/:msgId",
//   authenticate,
//   isValidId,
//   validateBody(msgSchema),
//   editMsg
// );

// router.delete("/:msgId", authenticate, isValidId, deleteById);

module.exports = router;
