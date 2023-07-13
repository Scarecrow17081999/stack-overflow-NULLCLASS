// const User = require("../models/userModel");
// const Post = require("../models/postModel");

// const cloudinary = require("cloudinary");
// CREATE POSTS //
// exports.createPost = async (req, res) => {
//   try {
//     const { caption, image } = req.body;

//     const myCloud = await cloudinary.v2.uploader.upload(image, {
//       folder: "posts",
//     });

//     const post = {
//       caption,
//       image: {
//         public_id: myCloud.public_id,
//         url: myCloud.secure_url,
//       },
//       owner: req.user._id,
//     };
//     const newPost = await Post.create(post);
//     const user = await User.findById(req.user._id);

//     user.posts.push(newPost._id);
//     await user.save();

//     res.status(201).json({
//       success: true,
//       message: "Post created successfully",
//       newPost,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// LIKE OR UNLIKE POST //

// exports.likeDislikePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { user } = req;
//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     if (post.likes.includes(user._id)) {
//       const index = post.likes.indexOf(user._id);
//       post.likes.splice(index, 1);
//       await post.save();
//       return res.status(200).json({
//         success: true,
//         message: "Post unliked",
//       });
//     } else {
//       post.likes.push(user._id);
//       await post.save();
//       return res.status(200).json({
//         success: true,
//         message: "Post liked",
//       });
//     }
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// DELETE POST //

// exports.deletePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { _id } = req.user;
//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     if (_id.toString() != post.owner._id.toString()) {
//       return res.status(401).json({
//         success: false,
//         message: "You are not the owner of this post",
//       });
//     }

//     const user = await User.findById(_id);
//     const index = user.posts.indexOf(id);
//     user.posts.splice(index, 1);
//     await user.save();
//     await Post.findByIdAndDelete(id);

//     res.status(200).json({
//       success: true,
//       message: "Post deleted",
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// UPDATE CAPTION //

// exports.updateCaption = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { _id } = req.user;
//     const post = await Post.findById(id);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     if (_id.toString() != post.owner._id.toString()) {
//       return res.status(401).json({
//         success: false,
//         message: "You are not the owner of this post",
//       });
//     }

//     post.caption = req.body.caption;
//     await post.save();

//     res.status(200).json({
//       success: true,
//       message: "Caption updated",
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// ADD COMMENT //

// exports.addComment = async (req, res) => {
//   try {
//     const { comment } = req.body;
//     const { id } = req.params;
//     const { _id } = req.user;
//     const post = await Post.findById(id);
//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     let commentIndex = -1;
//     post.comments.forEach((comment, index) => {
//       if (comment.user.toString() == _id.toString()) {
//         commentIndex = index;
//       }
//     });

//     if (commentIndex != -1) {
//       post.comments[commentIndex].comment = req.body.comment;
//       await post.save();
//       res.status(200).json({
//         success: true,
//         message: "Comment updated",
//       });
//     } else {
//       post.comments.push({ user: _id, comment: comment });
//       post.save();
//       res.status(200).json({
//         success: true,
//         message: "Comment added",
//       });
//     }
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// DELETE COMMENT //

// exports.deleteComment = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     // if owner wants to delete//
//     if (post.owner.toString() == req.user._id.toString()) {
//       if (req.body.commentId == undefined) {
//         return res.status(404).json({
//           success: false,
//           message: "Comment Id is required",
//         });
//       }
//       post.comments.forEach((comment, index) => {
//         if (comment._id.toString() == req.body.commentId.toString()) {
//           return post.comments.splice(index, 1);
//         }
//       });
//       await post.save();
//       return res.status(200).json({
//         success: true,
//         message: "Selected Comment Has deleted",
//       });
//     }
//     // if not the owner
//     else {
//       post.comments.forEach((comment, index) => {
//         if (comment.user.toString() == req.user._id.toString()) {
//           return post.comments.splice(index, 1);
//         }
//       });
//       await post.save();
//       return res.status(200).json({
//         success: true,
//         message: "Comment deleted",
//       });
//     }
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
