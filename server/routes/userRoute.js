const express = require("express");
const {
  registerUser,
  loginUser,
  followUnfollowUser,
  logout,
  updatePassword,
  updateProfile,
  deleteProfile,
  myProfile,
  getUserProfile,
  getAllUsersProfile,
  forgotPassword,
  resetPassword,
  getMyPosts,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { addComment, deleteComment } = require("../controllers/postController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(isAuthenticated, logout);
router.route("/follow/:id").post(isAuthenticated, followUnfollowUser);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/user/:id").get(isAuthenticated, getUserProfile);
router.route("/users").get(isAuthenticated, getAllUsersProfile);
router.route("/my/posts").get(isAuthenticated, getMyPosts);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router
  .route("/post/comment/:id")
  .put(isAuthenticated, addComment)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
