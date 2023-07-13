// const express = require("express");
// const {
//   createPost,
//   likeDislikePost,
//   deletePost,
//   updateCaption,
// } = require("../controllers/postController");
// const { isAuthenticated } = require("../middlewares/isAuthenticated");
// const { getFollowingPost } = require("../controllers/userController");
// const router = express.Router();

// router.route("/post/upload").post(isAuthenticated, createPost);
// router
//   .route("/post/:id")
//   .get(isAuthenticated, likeDislikePost)
//   .put(isAuthenticated, updateCaption)
//   .delete(isAuthenticated, deletePost);

// router.route("/posts").get(isAuthenticated, getFollowingPost);

// module.exports = router;
