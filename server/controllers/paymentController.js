const Payment = require("../models/paymentModel");
const instance = require("../config/payment");
const crypto = require("crypto");
const User = require("../models/userModel");

exports.checkout = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const options = {
      amount: Number(amount * 100),
      currency,
    };

    const payment = await instance.orders.create(options);
    console.log(payment, "--------");

    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
exports.paymentVerification = async (req, res) => {
  try {
    const { _id } = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here
      const order = await instance.orders.fetch(razorpay_order_id);
      console.log(order);
      const newOrder = await Payment.create({
        user: _id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        plan:
          order?.amount == 0
            ? "free"
            : order?.amount == 10000
            ? "silver"
            : order?.amount == 100000
            ? "gold"
            : "",
      });
      const user = await User.findById(_id);
      user.payments.push(newOrder._id);
      user.isSubscribed = true;
      await user.save();
      res.redirect(
        `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
exports.getCurrentPlan = async (req, res) => {
  const { id: _id } = req.body;
  console.log(_id);
  try {
    if (!_id) {
      return res.status(400).json({
        success: false,
        error: "No id found",
      });
    }
    const payment = await Payment.findById({ _id });
    if (!payment) {
      return res.status(400).json({
        success: false,
        error: "No payment found",
      });
    }
    payment.razorpay_signature = "--------";
    return res.status(200).json({ success: true, payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
