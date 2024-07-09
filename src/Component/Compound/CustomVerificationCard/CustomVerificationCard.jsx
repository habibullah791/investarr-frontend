import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineVerifiedUser, MdOutlinePending } from "react-icons/md";
import VerificationCodeInput from '../../Atom/VerificationCodeInput/VerificationCodeInput';

const CustomVerificationCard = ({
    Icon,
    is_verified,
    handleVerify,
    loadingVerify,
    showVerificationCode,
    setShowVerificationCode,
    title,
    statusText,
    verifiedText,
    pendingText,
    successMessage,
    promptMessage,
    resendLinkText,
    verifyButtonText,
}) => {
    const [showResendEmailButton, setShowResendEmailButton] = useState(!is_verified);
    const [codes, setCodes] = useState(Array(4).fill(''));

    const onCodeChange = (newCodes) => {
        setCodes(newCodes);
    };

    const handleEmailVerification = () => {
        handleVerify(codes);
    };

    return (
        <div className="w-1/2 flex flex-col gap-4 border border-gray-200 p-4 rounded-lg">
            <div className='flex flex-row items-center gap-2'>
                {Icon}
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className='flex flex-row justify-between items-center gap-2'>
                {showVerificationCode ? (
                    <>
                        <VerificationCodeInput codes={codes} onCodeChange={onCodeChange} />
                        <button
                            onClick={handleEmailVerification}
                            className="border border-primary text-primary px-4 py-1 rounded-md hover:bg-primary hover:text-white flex items-center gap-1"
                            disabled={loadingVerify}
                        >
                            {loadingVerify ? (
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.5A1.5 1.5 0 0010.5 1h-3A1.5 1.5 0 006 2.5V4a8 8 0 018 8zm12 0a8 8 0 01-8 8V21.5A1.5 1.5 0 0013.5 23h3a1.5 1.5 0 001.5-1.5V20a8 8 0 01-8-8zM4 12a8 8 0 018-8V2.5A1.5 1.5 0 0010.5 1h-3A1.5 1.5 0 006 2.5V4a8 8 0 018 8zm12 0a8 8 0 01-8 8V21.5A1.5 1.5 0 0013.5 23h3a1.5 1.5 0 001.5-1.5V20a8 8 0 01-8-8z"></path>
                                </svg>
                            ) : (
                                verifyButtonText
                            )}
                        </button>
                    </>
                ) : (
                    <div className='w-11/12 flex flex-row justify-between items-center gap-2'>
                        <div>
                            <p className="text-muted-foreground text-gray-500">{statusText}</p>
                            <p className={`text-sm font-semibold ${is_verified ? 'text-green-500' : 'text-red-500'}`}>
                                {is_verified ? verifiedText : pendingText}
                            </p>
                        </div>
                        <div>
                            {is_verified ? (
                                <MdOutlineVerifiedUser className="text-green-500 text-2xl" />
                            ) : (
                                <MdOutlinePending className="text-red-500 text-2xl" />
                            )}
                        </div>
                    </div>
                )}
            </div>
            {is_verified ? (
                <div>
                    <p className="text-muted-foreground text-gray-500">{successMessage}</p>
                </div>
            ) : (
                <div>
                    <p className="text-muted-foreground text-gray-500">{promptMessage}</p>
                    {showResendEmailButton && (
                        <Link
                            onClick={() => setShowVerificationCode(true)}
                            className="text-primary font-medium"
                        >
                            {resendLinkText}
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default CustomVerificationCard;
