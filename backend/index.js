
import express from 'express'
import mongoose from 'mongoose';

import cors from 'cors';
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/razorpay', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

const connect = async () => {
    try {
        await connect('mongodb://localhost:27017', {
            dbName: "paymentGateway",
        });
        console.log("---***Database Connected Successfully***---")
    } catch (error) {
        console.log(error);
    }
}

// Define a Schema and Model for Registration
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    cardNumber: String,
    cardExpiry: String,
    cardCVV: String,
    // logoUrl: String,
    paymentId: String,
    paymentStatus: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

// Route to save registration data after payment
app.post('/api/save-payment', async (req, res) => {
    const { name, email, phone, cardNumber, cardExpiry, cardCVV, paymentId, paymentStatus } = req.body;

    // Log form data to console
    console.log('Received form data:', req.body);

    const newRegistration = new Registration({
        name,
        email,
        phone,
        cardNumber,
        cardExpiry,
        cardCVV,
        // logoUrl,
        paymentId,
        paymentStatus
    });

    try {
        await newRegistration.save();
        res.status(200).json({ message: 'Payment data saved successfully' });
    } catch (err) {
        console.error('Error saving payment data:', err);
        res.status(500).json({ error: 'Failed to save payment data' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
