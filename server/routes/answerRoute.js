const express = require("express");
const { postAnswer, deleteAnswer } = require("../controllers/answerController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/answer/:id").patch(isAuthenticated, postAnswer);
router.route("/delete/:id").patch(isAuthenticated, deleteAnswer);
module.exports = router;
