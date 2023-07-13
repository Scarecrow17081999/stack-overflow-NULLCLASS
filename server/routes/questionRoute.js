const express = require("express");
const {
  postQuestion,
  getQuestions,
  getQuestion,
  deleteQuestion,
  voteQuestion,
} = require("../controllers/questionController.js");
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");

const router = express.Router();

router.route("/question").post(isAuthenticated, postQuestion).get(getQuestions);
router
  .route("/question/:id")
  .get(getQuestion)
  .delete(isAuthenticated, deleteQuestion);
router.route("/question/vote/:id").patch(isAuthenticated, voteQuestion);
module.exports = router;
