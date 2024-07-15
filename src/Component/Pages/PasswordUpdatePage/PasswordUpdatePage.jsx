import React, { useState } from 'react';
import InputBox from '../../Atom/InputBox/InputBox';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Atom/Spinner/Spinner';
import { resetPassword } from '../../../api/User/User';  // Adjust this path as needed
import imageSrc from '../../../Assets/HeroBanner_1.png';

const PasswordUpdatePage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirm_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await resetPassword(formData);
            setLoading(false);
            toast.success(response.message);
            navigate('/login');
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message); // Display error message
        }
    };

    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        backgroundColor: '#483BBF',
                        border: '1px solid #483BBF',
                        padding: '7px 12px',
                        color: '#FFFFFF',
                        fontWeight: '400',
                        borderRadius: '15px',
                    },
                    iconTheme: {
                        secondary: '#FFFFFF',
                    },
                }}
            />
            {loading && <Spinner />}
            <div className='w-full flex justify-center items-start my-16'>
                <div className='w-4/5 flex flex-col md:flex-row justify-between items-start'>
                    <div className='w-full md:w-2/5 flex flex-col justify-between items-center gap-6'>
                        <h1 className="tracking-tighter text-primary text-3xl md:text-5xl font-bold">Update Password</h1>
                        <form
                            onSubmit={handleSubmit}
                            className='w-full flex flex-col justify-center items-center gap-3'
                        >
                            <h2 className="tracking-tighter text-primary text-lg md:text-2xl mb-6">Enter your username and new password</h2>
                            <div className='w-full'>
                                <InputBox
                                    label={"Username"}
                                    placeholder={"Username"}
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                />
                                <InputBox
                                    label={"New Password"}
                                    placeholder={"New Password"}
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                                <InputBox
                                    label={"Confirm Password"}
                                    placeholder={"Confirm Password"}
                                    name="confirm_password"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className='w-full bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border-2 hover:border-primary'
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                    <div className='md:block hidden w-1/2'>
                        <img
                            src={imageSrc}
                            alt='banner'
                            className='w-4/5 h-auto'
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordUpdatePage;
