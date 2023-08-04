const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { postChatResponse } = require("../controllers/chatController");

const router = express.Router();

router.route("/chat").post(isAuthenticated, postChatResponse);
module.exports = router;
