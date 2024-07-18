import React, { useState } from 'react';
import InputBox from '../../Atom/InputBox/InputBox';

import Spinner from "../../Atom/Spinner/Spinner";
import { toast } from 'react-hot-toast';

import { SendUserEmail } from '../../../api/User/User';

const CallToAction = () => {
    const [email, setEmail] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const SendEmail = async () => {
        setIsLoading(true);
        const response = await SendUserEmail(email)
        setIsLoading(false);
        if (response.statusCode === 200) {
            setEmail('');
            toast.success(response.message)
        }
        else {
            toast.error(response.message)
        }
    };

    if (isloading) return <Spinner />

    return (
        <div className='w-full flex justify-center items-start my-8 py-4'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-center items-center text-center'>
                <h1 className='w-full md:w-4/5 text-center text-4xl text-primary font-bold'>Find the Right Investor or Investee</h1>
                <p className='w-full md:w-3/4 text-gray-600 text-lg mt-4 md:mt-0'>Whether you're an investor looking for the next big opportunity or an entrepreneur seeking funding, we can help you connect and explore the possibilities.</p>
                <div className='w-full md:w-2/5 flex flex-col md:flex-row justify-center items-center gap-4 mt-4'>
                    <div className='w-11/12 md:w-3/5'>
                        <InputBox
                            type='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='w-11/12 md:w-2/5'>
                        <button
                            onClick={SendEmail}
                            className='bg-primary text-white px-4 py-2 rounded-md w-full'
                        >
                            Get Started
                        </button>
                    </div>
                </div>
                <p className='w-11/12 md:w-2/5 text-gray-600' >Our team will reach out to you to discuss your needs and find the best match.</p>
            </div>
        </div>
    );
};

export default CallToAction;
