import { useState } from "react";
import { useDispatch } from "react-redux";

import toast, { Toaster } from 'react-hot-toast';


import InputBox from '../../../Atom/InputBox/InputBox';
import Spinner from '../../../Atom/Spinner/Spinner';

import { updateEmailPassword } from '../../../../api/User/User';
import { setUser } from '../../../../store/user/userSlice';



const EmailPassword = ({ user, tokens }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.email || '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        setLoading(true);
        let formApiData = {
            email: formData.email,
            password: formData.password,
        };

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        for (const key in formApiData) {
            if (formApiData[key] === '') {
                toast.error(`${key} cannot be empty`);
                setLoading(false);
                return;
            }
        }

        try {
            const response = await updateEmailPassword(tokens.access, user?.id, formApiData);
            toast.success('Email & Password updated successfully');
            dispatch(setUser({
                ...user,
                email: formData.email,
            }));
        } catch (error) {
            toast.error(`Failed to update Email & Password: ${error.detail || error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full'>
            {loading && <Spinner />}
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
            <h2 className="tracking-tighter text-2xl font-bold mb-4">Email & Password</h2>
            <div className="w-full md:w-1/2 flex flex-col gap-y-4 items-start">
                <div className='w-full'>
                    <InputBox
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <InputBox
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <InputBox
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button
                onClick={handleSave}
                className="bg-primary text-white px-4 py-2 rounded-lg mt-4 hover:bg-white hover:text-primary border border-primary"
            >
                Save
            </button>

        </div>
    );
}

export default EmailPassword;