import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { FaCheck } from "react-icons/fa6";
import LightICon from '../../../Assets/thought.png';

import Dropdown from '../../Atom/DropDown/DropDown.jsx';
import InputBox from '../../Atom/InputBox/InputBox.jsx';
import TextArea from '../../Atom/TextArea/TextArea.jsx';
import Spinner from '../../Atom/Spinner/Spinner.jsx';

import { membershipPlans } from './membershipplans.data.js';

import { Authentication, RegisterIPNURL, SubmitOrderRequest } from '../../../api/Payment/Payment.js';

const Membership = () => {

    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [paymentFormDetails, setPaymentFormDetails] = useState({
        id: uuidv4(),
        currency: '',
        amount: 0,
        description: '',
        callback_url: 'https://investarr-frontend.vercel.app/payment-success',
        notification_id: '',
        billing_address: {
            email_address: '',
            phone_number: '',
            country_code: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            line_1: '',
            line_2: '',
            city: '',
            state: '',
            postal_code: '',
            zip_code: ''
        }
    });

    const handleAuth = async (planPrice) => {
        try {
            setLoading(true);
            const response = await Authentication();
            if (response.status === "200") {
                console.log("Authentication Successful", response);
                setAuthToken(response.token);
                const RegisterIPNURLResponse = await RegisterIPNURL('https://investarr-frontend.vercel.app/payment-success', 'GET', response.token);
                console.log("Register IPN URL Response", RegisterIPNURLResponse);

                // Update paymentFormDetails using functional form of setState
                setPaymentFormDetails(prevPaymentFormDetails => ({
                    ...prevPaymentFormDetails,
                    amount: planPrice,
                    notification_id: RegisterIPNURLResponse.ipn_id
                }));

                setShowPaymentForm(true);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in paymentFormDetails.billing_address) {
            setPaymentFormDetails({
                ...paymentFormDetails,
                billing_address: {
                    ...paymentFormDetails.billing_address,
                    [name]: value
                }
            });
        } else {
            setPaymentFormDetails({
                ...paymentFormDetails,
                [name]: value
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(paymentFormDetails);
        try {
            const response = await SubmitOrderRequest(paymentFormDetails, authToken);
            if (response.status === "200") {
                console.log("Order Request Submitted Successfully", response);
                window.open(response.redirect_url, '_blank');
            } else {
                console.error("Failed to submit order request:", response);
            }
        } catch (error) {
            console.error("Error submitting order request:", error);
        }
    };


    return (
        <div className='w-full flex justify-center items-start my-16'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-center items-center gap-8'>
                {loading && <Spinner />}
                {showPaymentForm ? (
                    <div className='flex flex-col items-center mt-8 shadow-lg p-12 rounded-lg'>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Payment Details</h2>
                        <form className='w-full max-w-lg' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <div className=''>
                                    <InputBox
                                        label="Email Address"
                                        placeholder="Email Address"
                                        name="email_address"
                                        type="email"
                                        value={paymentFormDetails.billing_address.email_address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className=''>
                                    <Dropdown
                                        label="Currency"
                                        placeholder="Select Currency"
                                        name='currency'
                                        value={paymentFormDetails.currency}
                                        onChange={handleInputChange}
                                        options={[
                                            { value: 'USD', label: 'USD' },
                                            { value: 'KES', label: 'KES' },
                                            { value: 'EUR', label: 'EUR' },
                                            { value: 'TZS', label: 'TZS' },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className='mb-4'>
                                <TextArea
                                    label="Description"
                                    placeholder="Please provide a brief description of yourself and your investment goals."
                                    name="description"
                                    value={paymentFormDetails.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <button
                                    type='submit'
                                    className='w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                >
                                    Submit Payment
                                </button>
                            </div>
                        </form>
                    </div>

                ) : (
                    <>
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <h1 className="tracking-tighter text-center text-4xl font-bold text-primary">Unlock the Power of Our Membership</h1>
                            <p className='text-center'>Join our community of investors and investees to access exclusive resources, networking opportunities, and tailored support.</p>
                        </div >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
                            {membershipPlans.map((plan, index) => (
                                <div key={index} className={`border rounded-lg shadow-lg p-6 flex flex-col items-start ${index === membershipPlans.length - 1 ? 'bg-primary text-white' : ''}`}>
                                    <div className='flex flex-row justify-center items-center gap-2 mb-5'>
                                        <div className={`rounded-md p-3 flex items-center justify-center ${index === membershipPlans.length - 1 ? 'bg-white' : 'bg-primary'}`}>
                                            <plan.icon className={`w-6 h-6 ${index === membershipPlans.length - 1 ? 'text-primary' : 'text-white'}`} />
                                        </div>
                                        <h2 className={`tracking-tighter text-primary text-2xl font-semibold ${index === membershipPlans.length - 1 ? 'text-white' : ''}`}>{plan.name}</h2>
                                    </div>
                                    <p className="text-4xl font-bold">
                                        ${plan.price}
                                        <span className="text-lg font-normal text-gray-500 dark:text-gray-400"> /month</span>
                                    </p>
                                    <ul className="text-gray-700 my-4 mb-4">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start space-x-2">
                                                <FaCheck className="h-5 w-5 text-green-500" />
                                                <span className={`${index === membershipPlans.length - 1 ? 'text-white' : ''}`}>{feature}</span>
                                            </div>
                                        ))}
                                    </ul>
                                    <Link
                                        onClick={() => handleAuth(plan.price)}
                                        className={`w-full bg-primary py-2 px-4 rounded mt-auto ${index === membershipPlans.length - 1 ? 'bg-white text-primary' : 'text-white'}`}
                                    >
                                        {plan.buttonTitle}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-200 rounded-lg w-full flex flex-col md:flex-row justify-center items-center gap-4 py-8 px-4">
                            <img src={LightICon} alt="Light Icon" className="w-24 h-24" />
                            <h2 className="tracking-tighter md:w-3/4 text-center text-2xl font-semibold text-primary">Become a Premium Member and Boost Your Chances of Finding the Right Investment</h2>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};

export default Membership;
