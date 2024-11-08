// import mongoose, { model } from 'mongoose';

// const { Schema } = mongoose;

// const PaymentSchema = new Schema({
//     razorpay_order_id: {
//         type: String,
//         required: true,
//     },
//     razorpay_payment_id: {
//         type: String,
//         required: true,
//     },
//     razorpay_signature: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// });

// PaymentSchema.pre('save', function (next) {
//     console.log('Saving Payment:', this); // Log before saving
//     next();
// });

// export default model('payment', PaymentSchema);

import mongoose from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

PaymentSchema.pre('save', function(next) {
    console.log('Saving Payment:', this); // Log before saving
    next();
});

export default mongoose.model('Payment', PaymentSchema);
