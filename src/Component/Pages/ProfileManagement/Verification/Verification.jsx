import React, { useState } from 'react';

import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { IoDocumentAttachOutline } from "react-icons/io5";


import CustomVerificationCard from '../../../Compound/CustomVerificationCard/CustomVerificationCard';

const Verification = ({ user, tokens }) => {
    // const { is_email_verified, is_phone_verified } = user;
    const [is_email_verified, setIsEmailVerified] = useState(false);
    const [is_phone_verified, setIsPhoneVerified] = useState(false);
    const [loadingVerifyEmail, setLoadingVerifyEmail] = useState(false);
    const [loadingVerifyPhone, setLoadingVerifyPhone] = useState(false);
    const [showEmailVerificationCode, setShowEmailVerificationCode] = useState(false);
    const [showMobileVerificationCode, setShowMobileVerificationCode] = useState(false);


    const handleVerifyEmail = (codes) => {
        setLoadingVerifyEmail(true);
        codes = codes.join('');
        console.log('Verification codes:', codes);

        setTimeout(() => {
            setLoadingVerifyEmail(false);
            setShowEmailVerificationCode(false);
            setIsEmailVerified(true);
        }, 2000);
    };

    const handleVerifyPhone = (codes) => {
        setLoadingVerifyPhone(true);
        codes = codes.join('');
        console.log('Verification codes:', codes);

        setTimeout(() => {
            setLoadingVerifyPhone(false);
            setShowMobileVerificationCode(false);
            setIsPhoneVerified(true);
        }, 2000);
    }

    return (
        <div className="container">
            <div className='w-11/12'>
                <h2 className="tracking-tighter text-2xl font-bold mb-4">Verify your account</h2>
                <div className='flex flex-row gap-6 mb-8'>
                    {/* <CustomVerificationCard
                        is_email_verified={is_email_verified}
                        handleVerifyEmail={handleVerifyEmail}
                        loadingVerifyEmail={loadingVerifyEmail}
                        showEmailVerificationCode={showEmailVerificationCode}
                        setShowEmailVerificationCode={setShowEmailVerificationCode}
                    /> */}
                    <CustomVerificationCard
                        Icon={<MdOutlineEmail className='text-2xl text-primary' />}
                        is_verified={is_email_verified}
                        handleVerify={handleVerifyEmail}
                        loadingVerify={loadingVerifyEmail}
                        showVerificationCode={showEmailVerificationCode}
                        setShowVerificationCode={setShowEmailVerificationCode}
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
