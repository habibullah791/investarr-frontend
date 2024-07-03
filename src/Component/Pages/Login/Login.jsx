import React, { useState } from 'react';
import InputBox from '../../Atom/InputBox/InputBox';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../Atom/Spinner/Spinner';
import imageSrc from '../../../Assets/HeroBanner_1.png';

import { login } from '../../../api/User/User';
import { useDispatch } from 'react-redux';
import { setUser, setTokens } from '../../../store/user/userSlice';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        login(formData).then((loginResponse) => {
            dispatch(setUser(loginResponse.user));
            dispatch(setTokens({
                access: loginResponse.access,
                refresh: loginResponse.refresh,
            }));
            setLoading(false);
            navigate('/');
            setError('');
        }).catch((error) => {
            setLoading(false);
            toast.error('Invalid Credentials');
        });
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
                        <h1 className="tracking-tighter text-primary text-3xl md:text-5xl font-bold">Welcome back!</h1>
                        <form
                            onSubmit={handleSubmit}
                            className='w-full flex flex-col justify-center items-center gap-3'
                        >
                            <h2 className="tracking-tighter text-primary text-lg md:text-2xl mb-6">Log in to your account</h2>
                            <div className='w-full'>
                                <InputBox
                                    label={"Username"}
                                    placeholder={"Username"}
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                />
                                <InputBox
                                    label={"Password"}
                                    placeholder={"Password"}
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className='w-full bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border-2 hover:border-primary'
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                            {error && <p className="text-red-500">{error}</p>}
                        </form>
                        <p className="mt-4 text-sm text-gray-600">Don't have an account? <a href="/signup" className="text-primary">Sign up</a></p>
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

export default LoginPage;
