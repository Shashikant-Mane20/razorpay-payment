// import express from 'express';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import 'dotenv/config';
// import Payment from '../models/Payment.js';

// const router = express.Router();

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_SECRET,
// });

// // ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
// router.post('/order', (req, res) => {
//     const { amount } = req.body;

//     try {
//         const options = {
//             amount: Number(amount * 100),
//             currency: "INR",
//             receipt: crypto.randomBytes(10).toString("hex"),
//         }
        
//         razorpayInstance.orders.create(options, (error, order) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).json({ message: "Something Went Wrong!" });
//             }
//             res.status(200).json({ data: order });
//             console.log(order)
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error!" });
//         console.log(error);
//     }
// })



// router.post('/verify', async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     try {
//         // Create Sign
//         const sign = razorpay_order_id + "|" + razorpay_payment_id;

//         // Create ExpectedSign
//         const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
//             .update(sign.toString())
//             .digest("hex");

//         // Check if signature matches
//         const isAuthentic = expectedSign === razorpay_signature;

//         if (isAuthentic) {
//             const payment = new Payment({
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature
//             });

//             // Save Payment
//             await payment.save();

//             // Log saved payment
//             console.log('Payment Saved:', payment);

//             // Send Message
//             res.json({ message: "Payment Successfully Verified" });
//         } else {
//             return res.status(400).json({ message: "Invalid signature" });
//         }
//     } catch (error) {
//         console.log("Error saving payment:", error);
//         res.status(500).json({ message: "Internal Server Error!" });
//     }
// });


// export default router

import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';
import Payment from '../models/Payment.js';

const router = express.Router();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1: Create Order API Using POST Method http://localhost:4000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100), // amount in paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

// ROUTE 2: Payment Verification API Using POST Method http://localhost:4000/api/payment/verify
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create Expected Sign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // Check if the signature is valid
        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save payment details to MongoDB
            await payment.save().catch((error) => {
                console.log("Error during save:", error);
                return res.status(500).json({ message: "Payment save failed!" });
            });

            console.log('Payment Saved:', payment);

            // Respond with success message
            res.json({
                message: "Payment Successfully Verified and Saved!",
            });
        } else {
            return res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        console.log("Error saving payment:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

export default router;
