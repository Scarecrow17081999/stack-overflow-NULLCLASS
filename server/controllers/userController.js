const User = require("../models/userModel");
const Post = require("../models/postModel");
const { sendEmail } = require("../middlewares/isAuthenticated");

// REGISTER USER //
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      user = await User.create({
        name,
        email,
        password,
      });
      const token = await user.generateAuthToken();

      const tokenOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
      };

      return res.status(201).cookie("token", token, tokenOptions).json({
        success: true,
        message: "User registered successfully",
        token,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// LOGIN USER //
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: true,
        message: "Invalid Credentials",
      });
    }
    const token = await user.generateAuthToken();

    const tokenOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: false,
    };
    return res.status(200).cookie("token", token, tokenOptions).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// LOGOUT //

exports.logout = async (req, res) => {
  try {
    const tokenOptions = {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.status(200).cookie("token", null, tokenOptions).json({
      success: true,
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// FOLLOW UNFOLLOW USER //

exports.followUnfollowUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexFollower = userToFollow.following.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexFollowing, 1);
      userToFollow.followers.splice(indexFollower, 1);
      await loggedInUser.save();
      await userToFollow.save();

      return res.status(200).json({
        success: true,
        message: "User unfollowed",
      });
    }

    userToFollow.followers.push(loggedInUser._id);
    loggedInUser.following.push(userToFollow._id);
    await loggedInUser.save();
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: "User followed",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
// GET FOLLOWING POST //

exports.getFollowingPost = async (req, res) => {
  try {
    const { following } = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: { $in: following },
    })
      .populate("owner likes comments.user", ["name", "avatar"])
      .exec();
    res.status(200).json({
      success: true,
      message: "User following posts received",
      posts,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PASSWORD //

exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter old password and new password",
      });
    }
    const user = await User.findById(req.user._id).select("+password");
    const isMatch = await user.comparePassword(oldPassword);

    if (isMatch) {
      user.password = newPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
      user.save();
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// UPDATE PROFILE //

exports.updateProfile = async (req, res) => {
  const { name, tags, about } = req.body;
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (name) {
      user.name = name;
      await user.save();
    }
    if (tags) {
      user.tags = tags;
      await user.save();
    }
    if (about) {
      user.about = about;
      await user.save();
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// DELETE ACCOUNT //

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await user.posts;
    const followers = await user.followers;
    const following = await user.following;
    const userId = req.user._id;
    for (let i = 0; i < post.length; i++) {
      await Post.findByIdAndDelete(post[i]);
    }
    // Remove users from followers following //
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }
    // Remove users from following followers //
    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);
      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    await User.findByIdAndDelete(req.user._id);
    const tokenOptions = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    res.status(200).cookie("token", null, tokenOptions);

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// MY PROFILE //

// MY PROFILE //

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      message: "Profile received",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER PROFILE //
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile received",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PROFILES //
exports.getAllUsersProfile = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: "All users profile received",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// FORGOT PASSWORD //
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetPasswordToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of the password for your account.\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n
      \n\n
      If you did request this, please follow the link below to reset your password.\n
      ${resetPasswordUrl}`;

    try {
      await sendEmail({ email: user.email, subject: "resetPassword", message });

      return res.status(200).json({
        success: true,
        message: `Password reset link sent to your email:${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// RESET PASSWORD //
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET MY POSTS //
exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No User Found",
      });
    }
    const posts = [];

    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }
    return res.status(200).json({
      success: true,
      message: "User Post Sent Successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
