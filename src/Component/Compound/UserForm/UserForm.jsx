import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Dropdown from '../../Atom/DropDown/DropDown';
import TextArea from '../../Atom/TextArea/TextArea';
import InputBox from '../../Atom/InputBox/InputBox';
import ImageField from '../../Atom/ImageField/ImageField';
import Spinner from '../../Atom/Spinner/Spinner';

import { signup } from '../../../api/User/User';
import { UploadSingleImageToCloud } from '../../../utils/utilityFunctions';
import { UserType, AreaOFIntrest } from '../../../Constant/constants';


import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


const UserForm = () => {
    const navigate = useNavigate();

    const totalSteps = 2;
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        profile_pic_url: '',
        first_name: '',
        last_name: '',
        username: '',
        password: '',
        email: '',
        address: '',
        area_of_interest: '',
        user_type: '',
        bio: '',
        startup_idea: '',
        startup_name: '',
        startup_description: '',
        phone_number: ''
    });

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };



    const handleSubmit = async () => {

        setLoading(true);
        if (formData.profile_pic_url) {
            try {
                const uploadedImageUrl = await UploadSingleImageToCloud(formData.profile_pic_url);
                formData.profile_pic_url = uploadedImageUrl;
            } catch (error) {
                setFormData(prevFormData => ({ ...prevFormData, profile_pic_url: '' }));
                setLoading(false);
                toast.error('Failed to upload profile picture');
                return;
            }
        }

        const formApiData = {
            ...formData,
            area_of_interest: Array.isArray(formData.area_of_interest) ? formData.area_of_interest.join(',') : formData.area_of_interest,
        };

        signup(formApiData).then((res) => {
            setLoading(false);
            toast.success('Signup successful!');
            navigate('/login');
        }).catch((err) => {
            setLoading(false);
            toast.error('An error occurred. Please try again later.');
        });
    }

    const progress = (step / totalSteps) * 100;

    const renderStepTwoOrThree = () => {
        if (formData.user_type === 'Investor') {
            return <StepThree setFormData={setFormData} formData={formData} handleChange={handleChange} onNext={handleNext} onBack={handleBack} onSubmit={handleSubmit} />;
        } else {
            return <StepTwo formData={formData} setFormData={setFormData} handleChange={handleChange} onNext={handleNext} onBack={handleBack} onSubmit={handleSubmit} />;
        }
    };



    return (
        <div className='w-full flex flex-col justify-center items-center gap-2'>
            <div className='w-full md:w-1/2 shadow-lg shadow-gray-200 py-10 px-5 md:px-16 rounded-lg'>
                {loading && <Spinner />}
                <div className="h-2 bg-gray-200 w-full">
                    <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
                </div>
                <h1 className="tracking-tighter text-3xl font-bold text-primary my-4 text-center">Investarr</h1>
                {step === 1 && <StepOne formData={formData} handleChange={handleChange} onNext={handleNext} />}
                {step === 2 && renderStepTwoOrThree()}
            </div>
        </div>
    );
};

export default UserForm;


const StepOne = ({ formData, handleChange, onNext }) => {
    const handleImageChange = (image) => {
        handleChange("profile_pic_url", image);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleNext = () => {

        const requiredFields = {
            'profile_pic_url': 'Profile Picture Cannot be empty',
            'username': 'Username Cannot be empty',
            'first_name': 'First Name Cannot be empty',
            'last_name': 'Last Name Cannot be empty',
            'email': 'Email Cannot be empty',
            'password': 'Password Cannot be empty',
            'phone_number': 'Phone Number Cannot be empty',
            'bio': 'Bio Cannot be empty',
            'user_type': 'User Type Cannot be empty',
        };

        const firstMissingField = Object.keys(requiredFields).find(field => !formData[field]);

        if (firstMissingField) {
            toast.error(requiredFields[firstMissingField]);
            return;
        }
        onNext();
    }

    return (
        <div className='flex flex-col justify-center items-center gap-5'>
            <h2 className="tracking-tighter text-xl font-bold text-primary my-4">Personal Information</h2>
            <div className='w-full flex flex-col gap-2'>
                <ImageField onChange={handleImageChange} />
                <InputBox
                    label="Username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <InputBox
                    label="First name"
                    placeholder="First Name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                />
                <InputBox
                    label="Last name"
                    placeholder="Last Name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                />
                <InputBox
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <InputBox
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <div className='flex flex-col my-1'>
                    <label className='text-sm text-primary'>Phone no</label>
                    <PhoneInput
                        inputStyle={{ width: '100%', height: '40px', borderRadius: '8px', border: '2px solid #483BBF' }}
                        buttonStyle={{ borderRadius: '8px 0 0 8px', borderLeft: '2px solid #483BBF', borderTop: '2px solid #483BBF', borderBottom: '2px solid #483BBF' }}
                        country={'us'}
                        value={formData.phone_number}
                        onChange={phone => handleChange('phone_number', phone)}
                    />
                </div>
                <TextArea
                    label="Bio"
                    placeholder="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                />
                <Dropdown
                    label="User Type"
                    placeholder="User Type"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleInputChange}
                    options={UserType}
                />
            </div>
            <div className="w-full flex justify-end gap-4 mt-4">
                <button
                    className='bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border-2 hover:border-primary'
                    onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};


const StepTwo = ({ formData, setFormData, handleChange, onBack, onSubmit }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleSelectChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFormData({ ...formData, area_of_interest: values });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = {
            'area_of_interest': 'Area of Interest Cannot be empty',
            'startup_name': 'Startup Name Cannot be empty',
            'startup_idea': 'Startup Idea Cannot be empty',
            'startup_description': 'Startup Description Cannot be empty',
        };

        const firstMissingField = Object.keys(requiredFields).find(field => !formData[field]);

        if (firstMissingField) {
            toast.error(requiredFields[firstMissingField]);
            return;
        }

        onSubmit()
    }



    return (
        <div className='flex flex-col justify-center items-center gap-5'>
            <h2 className="tracking-tighter text-xl font-bold text-primary my-4">Startup Information</h2>
            <div className='w-full flex flex-col gap-2'>
                <InputBox
                    label="Address"
                    placeholder="Address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                <div className="col-span-2">
                    <label className='text-sm text-primary'>Area of Interest</label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        value={AreaOFIntrest.filter(option => formData.area_of_interest.includes(option.value))}
                        onChange={handleSelectChange}
                        placeholder="Area of intrest"
                        isMulti
                        options={AreaOFIntrest}
                        styles={{
                            control: (provided, state) => ({
                                ...provided,
                                border: '2px solid #483BBF',
                                borderRadius: '8px',
                                padding: '5px',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused ? '#483BBF' : null,
                                color: state.isFocused ? 'white' : null,
                            }),
                        }}
                    />
                </div>
                <InputBox
                    label="Startup Name"
                    placeholder="Startup Name"
                    name="startup_name"
                    value={formData.startup_name}
                    onChange={handleInputChange}
                />
                <TextArea
                    label="Startup Idea"
                    placeholder="Startup Idea"
                    name="startup_idea"
                    value={formData.startup_idea}
                    onChange={handleInputChange}
                />
                <TextArea
                    label="Startup Description"
                    placeholder="Startup Description"
                    name="startup_description"
                    value={formData.startup_description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="w-full flex justify-between gap-4">
                <button
                    className='bg-white text-primary border-2 border-primary py-2 px-6 rounded-lg hover:text-white hover:bg-primary'
                    onClick={onBack}
                >
                    Back
                </button>
                <button
                    className='bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border-2 hover:border-primary'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};



const StepThree = ({ setFormData, formData, handleChange, onSubmit, onBack }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = {
            'address': 'Address Cannot be empty',
            'area_of_interest': 'Area of Interest Cannot be empty',
        };

        const firstMissingField = Object.keys(requiredFields).find(field => !formData[field]);

        if (firstMissingField) {
            toast.error(requiredFields[firstMissingField]);
            return;
        }

        onSubmit();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleSelectChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFormData({ ...formData, area_of_interest: values });
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
                        // primary: '#FFFFFF',
                        secondary: '#FFFFFF',
                    },
                }}
            />
            <div className='w-full flex flex-col gap-2'>
                <h2 className="tracking-tighter text-xl font-bold text-primary my-4">Additional Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-span-2">
                        <label className='text-sm text-primary'>Area of Interest</label>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            value={AreaOFIntrest.filter(option => formData.area_of_interest.includes(option.value))}
                            onChange={handleSelectChange}
                            placeholder="Area of intrest"
                            isMulti
                            options={AreaOFIntrest}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: '2px solid #483BBF',
                                    borderRadius: '8px',
                                    padding: '5px',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isFocused ? '#483BBF' : null,
                                    color: state.isFocused ? 'white' : null,
                                }),
                            }}
                        />
                    </div>
                    <InputBox
                        label="Address"
                        placeholder="Address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <div className="w-full flex justify-between gap-4 mt-4">
                        <button
                            type="button"
                            className='bg-white text-primary border-2 border-primary py-2 px-6 rounded-lg hover:text-white hover:bg-primary'
                            onClick={onBack}
                        >
                            Back
                        </button>
                        <button
                            className='bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border-2 hover:border-primary'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </>
    );
};
