const { default: mongoose } = require("mongoose");
const Question = require("../models/questionModel");
// POST AN ANSWER //

exports.postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered } = req.body;
  try {
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Question id is required",
      });
    }
    if (!answerBody || !userAnswered) {
      return res.status(400).json({
        success: false,
        message: "Question body is required",
      });
    }
    const updatedQuestion = await Question.findByIdAndUpdate(_id, {
      $addToSet: {
        answer: [
          {
            answerBody,
            userAnswered,
            userId: req.user._id,
          },
        ],
      },
    });
    updateNoOfQuestions(_id, noOfAnswers);
    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "Answer posted successfully",
      updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error posting answer",
      error,
    });
  }
};

async function updateNoOfQuestions(_id, noOfAnswers) {
  try {
    await Question.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
}

exports.deleteAnswer = async (req, res) => {
  const { id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Question id is required",
      });
    }
    let updatedQuestion = await Question.findById(id);
    if (!updatedQuestion) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
      return res.status(400).json({
        success: false,
        message: "Answer id is invalid",
      });
    }
    updatedQuestion = await Question.updateOne(
      { _id: id },
      { $pull: { answer: { _id: answerId } } }
    );
    await updateNoOfQuestions(id, noOfAnswers);

    res.status(201).json({
      success: true,
      message: "Answer deleted successfully",
      updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting answer",
      error,
    });
  }
};
