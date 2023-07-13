// const Comment = require("../models/commentModel");

//POST A QUESTION//

// exports.postComment = async (req, res) => {
//   const { comment, user } = req.body;
//   const { id } = req.params;
//   try {
//     if (!id || !comment || !user) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all fields",
//       });
//     }
//     const comment = await Comment.create({ question_id: id, comment, user });
//     res.status(201).json({
//       success: true,
//       message: "Comment posted successfully",
//       comment,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error posting comment",
//       error,
//     });
//   }
// };
