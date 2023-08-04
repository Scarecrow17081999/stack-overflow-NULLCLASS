const express = require("express");

const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  checkout,
  paymentVerification,
  getCurrentPlan,
} = require("../controllers/paymentController");

const router = express.Router();

router
  .route("/pay")
  .post(isAuthenticated, checkout)
  .get(isAuthenticated, getCurrentPlan);
router.route("/paymentVerification").post(isAuthenticated, paymentVerification);

module.exports = router;
