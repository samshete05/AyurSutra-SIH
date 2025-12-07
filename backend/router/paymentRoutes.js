// backend/router/paymentRoutes.js

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1️⃣ Create order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR (e.g. 100)

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        message: "Invalid amount. Amount must be greater than 0." 
      });
    }

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    console.log("Order created successfully:", order.id);
    return res.json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);
    return res.status(500).json({ 
      message: error.message || "Unable to create order. Please try again." 
    });
  }
});

// 2️⃣ Verify signature (optional but recommended)
router.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        status: "failure", 
        message: "Missing payment details" 
      });
    }

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.json({ 
        status: "success",
        message: "Payment verified successfully" 
      });
    } else {
      return res.status(400).json({ 
        status: "failure",
        message: "Invalid payment signature" 
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ 
      status: "failure",
      message: "Error verifying payment" 
    });
  }
});

module.exports = router;
