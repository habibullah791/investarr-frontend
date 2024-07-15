import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';

import LightICon from '../../../Assets/thought.png';
import Dropdown from '../../Atom/DropDown/DropDown.jsx';
import InputBox from '../../Atom/InputBox/InputBox.jsx';
import TextArea from '../../Atom/TextArea/TextArea.jsx';
import Spinner from '../../Atom/Spinner/Spinner.jsx';
import LoginModal from '../../Compound/LoginModal/LoginModal.jsx';

import { selectTokens } from '../../../store/user/userSlice';
import { Authentication, RegisterIPNURL, SubmitOrderRequest } from '../../../api/Payment/Payment.js';
import { storeOrderTrackId } from '../../../api/User/User.js';
import { selectIsAuthenticated } from '../../../store/user/userSlice';

const membershipPlans = [
    {
        title: "Investors' Search Advice",
        price: 100,
        description: "Get expert advice on finding investors for your project."
    },
    {
        title: "Investors' Business Plan Writer",
        price: 650,
        description: "Get a professional business plan written for attracting investors."
    },
    {
        title: "Investment Legal Advice",
        price: 150,
        description: "Consult with legal experts for investment-related legal matters."
    }
];

const ServicesSection = () => {
    const tokens = useSelector(selectTokens);
    const [authToken, setAuthToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const isAuthenticated = useSelector(selectIsAuthenticated);

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

    const handleAuth = async (plan) => {
        if (!isAuthenticated) {
            setShowModal(true);
        }
        else {
            try {
                setLoading(true);
                const response = await Authentication();
                if (response.status === "200") {
                    setAuthToken(response.token);
                    const RegisterIPNURLResponse = await RegisterIPNURL('https://investarr-frontend.vercel.app/payment-success', 'GET', response.token);

                    setPaymentFormDetails(prevPaymentFormDetails => ({
                        ...prevPaymentFormDetails,
                        amount: plan.price,
                        notification_id: RegisterIPNURLResponse.ipn_id
                    }));

                    setShowPaymentForm(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

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
        setLoading(true);
        try {
            const response = await SubmitOrderRequest(paymentFormDetails, authToken);
            window.open(response.redirect_url, '_blank');
            setLoading(false);
            // if (response.status === "200") {
            //     const formData = {
            //         merchant_reference: response.merchant_reference,
            //         order_tracking_id: response.order_tracking_id,
            //         membership_tier: selectedPlan.name,
            //     };
            //     const orderTrackIdResponse = await storeOrderTrackId(tokens.access, formData);
            //     if (orderTrackIdResponse.statusCode === 201) {
            //         setLoading(false);
            //         window.open(response.redirect_url, '_blank');
            //     } else {
            //         setLoading(false);
            //         toast.error("Something went wrong. Please try again later.");
            //     }
            // } else {
            //     setLoading(false);
            //     console.error("Failed to submit order request:", response);
            // }
        } catch (error) {
            setLoading(false);
            console.error("Error submitting order request:", error);
        }
    };

    const handleClose = () => setShowModal(false);

    return (
        <div className='w-full flex justify-center items-start my-16'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-center items-center gap-8'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className="tracking-tighter text-center text-4xl font-bold text-primary">Unlock the Power of Our Membership</h1>
                    <p className='text-center'>Join our community of investors and investees to access exclusive resources, networking opportunities, and tailored support.</p>
                </div >
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                            {membershipPlans.map((plan, index) => (
                                <div key={index} className="w-full bg-white shadow-md rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-primary">{plan.title}</h3>
                                    <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-gray-700">${plan.price}</p>
                                        <button
                                            onClick={() => handleAuth(plan)}
                                            className="bg-primary hover:bg-white text-white hover:text-primary hover:border hover:border-primary py-2 px-4 rounded-lg transition-colors duration-300"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
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
            <LoginModal show={showModal} handleClose={handleClose} />
        </div >
    );
};

export default ServicesSection;
