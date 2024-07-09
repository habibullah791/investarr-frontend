import React, { useRef, useState, useEffect } from 'react';

const VerificationCodeInput = ({ length = 4, codes, onCodeChange }) => {
    const inputRefs = useRef([]);

    useEffect(() => {
        onCodeChange(codes);
    }, [codes, onCodeChange]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) {
            return;
        }
        const newCodes = [...codes];
        newCodes[index] = value.slice(-1);
        onCodeChange(newCodes);

        if (value !== '' && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && codes[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex justify-center items-center">
            {codes.map((code, index) => (
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    className="appearance-none w-12 h-12 text-center text-2xl bg-gray-200 m-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
                    value={code}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                />
            ))}
        </div>
    );
};

export default VerificationCodeInput;
