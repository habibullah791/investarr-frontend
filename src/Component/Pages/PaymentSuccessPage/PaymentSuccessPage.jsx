import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, setTokens } from '../../../store/user/userSlice';

import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

import { GetTransactionStatus, Authentication } from '../../../api/Payment/Payment.js';
import { verifyPayment } from '../../../api/User/User.js';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const tokens = useSelector(state => state.user.tokens);

    const [transactionStatus, setTransactionStatus] = useState(null);

    const getOrderDetails = async (OrderTrackingId) => {
        try {
            const response = await Authentication();
            if (response.status === "200") {
                const transactionStatus = await GetTransactionStatus(OrderTrackingId, response.token);
                if (transactionStatus?.status_code === 1) {
                    await verifyPayment(tokens.access, user?.id, 'Success')
                        .then((response) => {
                            dispatch(setUser(
                                {
                                    ...user,
                                    payment_status: 'Success'
                                }
                            ));
                        })
                }
                setTransactionStatus(transactionStatus);
            } else {
                console.log("Authentication failed");
            }
        } catch (error) {
            console.log("Error fetching transaction details:", error);
        }
    };


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const OrderTrackingId = searchParams.get('OrderTrackingId');
        getOrderDetails(OrderTrackingId);
    }, [location.search]);


    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <div className="bg-white p-7 px-16 rounded-lg shadow-lg text-center mt-16">
                {transactionStatus ? (
                    <>
                        <div className='flex items-center justify-center gap-3 mb-2'>
                            <h2 className="text-3xl font-semibold text-green-600">Payment Successful!</h2>
                            <IoCheckmarkDoneCircleSharp className="text-4xl text-green-600" />
                        </div>
                        <p className="text-gray-600 text-base">Thank you for your payment. Your transaction was successful.</p>
                        <hr className="my-4" />
                        <div className='mb-12'>
                            <p className="text-gray-600 mb-2">Transaction ID: <span className="font-semibold">{transactionStatus.confirmation_code}</span></p>
                            <p className="text-gray-600 mb-2">Amount Paid: <span className="font-semibold">${transactionStatus.amount}</span></p>
                            <p className="text-gray-600 mb-2">Date: <span className="font-semibold">{new Date(transactionStatus.created_date).toLocaleDateString()}</span></p>
                            <p className="text-gray-600 mb-2">Payment Method: <span className="font-semibold">{transactionStatus.payment_method}</span></p>
                            <p className="text-gray-600">Status: <span className="font-semibold">{transactionStatus.payment_status_description}</span></p>
                        </div>

                        <Link to="/"
                            className="text-base bg-primary text-center text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border hover:border-primary"
                        >
                            Go to Home
                        </Link>
                    </>
                ) : (
                    <p className="text-lg text-gray-700">Loading transaction details...</p>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
