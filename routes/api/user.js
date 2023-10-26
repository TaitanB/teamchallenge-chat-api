const express = require("express");

const { register, logout, current } = require("../../controllers/user");
const { userSchema } = require("../../schemas/users");
const { validateBody } = require("../../decorators");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(userSchema), register);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

module.exports = router;
