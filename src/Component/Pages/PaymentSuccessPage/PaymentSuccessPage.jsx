// PaymentSuccessPage.jsx

import React from 'react';

const PaymentSuccessPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
                <p className="text-lg text-gray-700 mb-8">Thank you for your payment. Your transaction was successful.</p>
                <p className="text-gray-600 mb-2">Transaction ID: <span className="font-semibold">1234567890</span></p>
                <p className="text-gray-600 mb-2">Amount Paid: <span className="font-semibold">$100</span></p>
                <p className="text-gray-600">Date: <span className="font-semibold">July 11, 2024</span></p>
                {/* Additional details or actions can be added here */}
            </div>
        </div>
    );
}

export default PaymentSuccessPage;
