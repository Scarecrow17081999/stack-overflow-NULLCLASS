const { default: mongoose } = require("mongoose");
const Question = require("../models/questionModel");

// POST A QUESTION //

exports.postQuestion = async (req, res) => {
  const Qdata = req.body;
  try {
    // if (!title || !body || !tags) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please fill all fields",
    //   });
    // }
    const question = new Question({ ...Qdata, userId: req.user._id });
    await question.save();
    res.status(201).json({
      success: true,
      message: "Question created successfully",
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      success: false,
      message: "Error posting question",
      error: error,
    });
  }
};
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).limit(100).sort({ askedOn: -1 });

    if (!questions) {
      res.status(400).json({
        success: false,
        message: "No questions found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching question",
      error,
    });
  }
};
exports.getQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findById(id);

    if (!question) {
      res.status(400).json({
        success: false,
        message: "No question found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Questions fetched successfully",
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error fetching question",
      error,
    });
  }
};
exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      res.status(400).json({
        success: false,
        message: "No question found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting question",
      error,
    });
  }
};
exports.voteQuestion = async (req, res) => {
  const { id } = req.params;
  const { value, userId } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id",
      });
    }
    const question = await Question.findById(id);
    if (!question) {
      res.status(400).json({
        success: false,
        message: "No question found",
      });
    }
    const upIndex = question.upVote.findIndex(
      (id) => String(id) === String(userId)
    );
    const downIndex = question.downVote.findIndex(
      (id) => String(id) === String(userId)
    );
    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await Question.findByIdAndUpdate(id, question);
    res.status(200).json({
      success: true,
      message: `Question ${value}ed successfully`,
      question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error voting question",
      error,
    });
  }
};
