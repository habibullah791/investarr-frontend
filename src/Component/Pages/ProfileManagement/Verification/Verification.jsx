import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { useDispatch } from 'react-redux';

import { setUser } from '../../../../store/user/userSlice';
import { GenerateOTP, VerifyOTP } from '../../../../api/User/User';

import CustomVerificationCard from '../../../Compound/CustomVerificationCard/CustomVerificationCard';

const Verification = ({ user, tokens }) => {
    console.log(user);
    console.log(user.email_verified);
    const dispatch = useDispatch();

    const [is_email_verified, setIsEmailVerified] = useState(user.is_email_verified);
    const [is_phone_verified, setIsPhoneVerified] = useState(false);
    const [loadingVerifyEmail, setLoadingVerifyEmail] = useState(false);
    const [loadingVerifyPhone, setLoadingVerifyPhone] = useState(false);
    const [showEmailVerificationCode, setShowEmailVerificationCode] = useState(false);
    const [showMobileVerificationCode, setShowMobileVerificationCode] = useState(false);


    const handleVerifyEmail = (codes) => {
        setLoadingVerifyEmail(true);
        codes = codes.join('');

        VerifyOTP(tokens.access, codes)
            .then((response) => {
                toast.success(response.message);
                setShowEmailVerificationCode(false);
                setIsEmailVerified(true);

                dispatch(setUser({
                    ...user,
                    email_verified: true
                }));

            }).catch((error) => {
                setShowEmailVerificationCode(false);
                toast.error(error.message);
            }).finally(() => {
                setLoadingVerifyEmail(false);
            });
    };

    const handleVerifyPhone = (codes) => {
        setLoadingVerifyPhone(true);
        codes = codes.join('');

        setTimeout(() => {
            setLoadingVerifyPhone(false);
            setShowMobileVerificationCode(false);
            setIsPhoneVerified(true);
        }, 2000);
    }

    const sendOTPEmail = async () => {
        GenerateOTP(tokens.access)
            .then((response) => {
                toast.success(response.message);
                setShowEmailVerificationCode(true);
            });

    }

    return (
        <div className="container">
            <div className='w-11/12'>
                <h2 className="tracking-tighter text-2xl font-bold mb-4">Verify your account</h2>
                <div className='flex flex-col md:flex-row gap-6 mb-8'>
                    <CustomVerificationCard
                        Icon={<MdOutlineEmail className='text-2xl text-primary' />}
                        is_verified={is_email_verified}
                        handleVerify={handleVerifyEmail}
                        loadingVerify={loadingVerifyEmail}
                        showVerificationCode={showEmailVerificationCode}
                        setShowVerificationCode={setShowEmailVerificationCode}
                        sendOTP={sendOTPEmail}
                        title="Email Verification"
                        statusText="Status:"
                        verifiedText="Verified"
                        pendingText="Pending"
                        successMessage="Your email address has been successfully verified."
                        promptMessage="Verify your email address to access all features of our platform."
                        resendLinkText="Resend verification email"
                        verifyButtonText="Verify"
                    />
                    <CustomVerificationCard
                        Icon={<BsTelephone className='text-2xl text-primary' />}
                        is_verified={is_phone_verified}
                        handleVerify={handleVerifyPhone}
                        loadingVerify={loadingVerifyPhone}
                        showVerificationCode={showMobileVerificationCode}
                        setShowVerificationCode={setShowMobileVerificationCode}
                        title="Phone Verification"
                        statusText="Status:"
                        verifiedText="Verified"
                        pendingText="Pending"
                        successMessage="Your Phone number has been successfully verified."
                        promptMessage="Verify your phone number to access all features of our platform."
                        resendLinkText="Resend verification code"
                        verifyButtonText="Verify"
                    />
                </div>
            </div>
        </div>
    )
}

export default Verification;
