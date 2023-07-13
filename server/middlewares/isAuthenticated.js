const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "You are not authenticated",
      });
    }
    const decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedUser._id);
    next();
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

// SEND EMAIL//

exports.sendEmail = async (options) => {
  try {
    // const transport = nodeMailer.createTransport({
    //   service: process.env.SMPT_SERVICE,
    //   host: process.env.SMPT_HOST,
    //   port: process.env.SMPT_PORT,
    //   auth: {
    //     user: process.env.SMPT_EMAIL,
    //     pass: process.env.SMPT_PASSWORD,
    //   },
    // });

    var transport = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SMPT_EMAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error.message,
    });
  }
};
