import { useState } from 'react';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: '',
        logoUrl: '', // New field for logo URL
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const initiatePayment = () => {
    //     const options = {
    //         key: "rzp_test_p9s4PGGp2P5wpd", // Your Razorpay Key
    //         amount: 50000, // Amount in paise (e.g., ₹500 = 50000 paise)
    //         currency: "INR",
    //         name: "My Company",
    //         description: "Registration Fee",
    //         image: formData.logoUrl || "https://your-default-logo-url.com/logo.png", // Use the logo URL from input
    //         handler: function (response) {
    //             console.log(response);
    //             alert("Payment Successful! Registration Complete.");
    //             // You can send response.payment_id to your backend to verify payment
    //         },
    //         prefill: {
    //             name: formData.name,
    //             email: formData.email,
    //             contact: formData.phone,
    //         },
    //         theme: {
    //             color: "#528FF0",
    //         },
    //     };

    //     const rzp = new window.Razorpay(options);
    //     rzp.open();
    // };

    const initiatePayment = () => {
        const options = {
            key: "rzp_test_p9s4PGGp2P5wpd",
            amount: 50000,
            currency: "INR",
            name: "My Company",
            description: "Registration Fee",
            image: formData.logoUrl || "https://your-default-logo-url.com/logo.png",
            handler: async function (response) {
                console.log(response);
                alert("Payment Successful! Registration Complete.");
    
                // Send payment and user data to the backend
                try {
                    const res = await fetch('http://localhost:5000/api/save-payment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...formData,
                            paymentId: response.razorpay_payment_id,
                            paymentStatus: 'Success',
                        }),
                    });
    
                    if (res.ok) {
                        console.log("Data saved successfully.");
                    } else {
                        console.log("Failed to save data.");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            },
            prefill: {
                name: formData.name,
                email: formData.email,
                contact: formData.phone,
            },
            theme: {
                color: "#528FF0",
            },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full sm:w-96 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-blue-500 p-4 text-white text-center">
                    <img
                        src={formData.logoUrl || "https://your-default-logo-url.com/logo.png"} // Dynamically load logo
                        alt="Logo"
                        className="mx-auto h-12 mb-2"
                    />
                    <h2 className="text-xl font-semibold">Register and Pay</h2>
                </div>
                <div className="p-6 space-y-4">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Card Details */}
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            placeholder="Enter your card number"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input
                                type="text"
                                id="cardExpiry"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="MM/YY"
                            />
                        </div>

                        <div>
                            <label htmlFor="cardCVV" className="block text-sm font-medium text-gray-700">CVV</label>
                            <input
                                type="text"
                                id="cardCVV"
                                name="cardCVV"
                                value={formData.cardCVV}
                                onChange={handleInputChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                                placeholder="CVV"
                            />
                        </div>
                    </div>

                    {/* Logo URL Input */}
                    <div>
                        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Logo URL</label>
                        <input
                            type="url"
                            id="logoUrl"
                            name="logoUrl"
                            value={formData.logoUrl}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-black"
                            placeholder="Enter logo image URL"
                        />
                    </div>
                </div>

                {/* Payment Button */}
                <div className="p-6">
                    <button
                        onClick={initiatePayment}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        Pay & Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;


