import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { setUser, setTokens } from '../../../../store/user/userSlice';

import InputBox from '../../../Atom/InputBox/InputBox';
import DropDown from '../../../Atom/DropDown/DropDown';
import ImageField from '../../../Atom/ImageField/ImageField';
import TextArea from '../../../Atom/TextArea/TextArea';
import Spinner from '../../../Atom/Spinner/Spinner';

import EmailPassword from '../EmailPass/EmailPass';
import Verifivation from '../Verification/Verification';

import { AreaOFIntrest } from '../../../../Constant/constants';
import { updateInvestorPersonalInfo } from '../../../../api/User/User';
import { UploadMultipleImagesToCloud, UploadSingleImageToCloud } from '../../../../utils/utilityFunctions';


import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import MultiImageField from '../../../Atom/MultiImageField/MultiImageField';

const animatedComponents = makeAnimated();


const InvestorsProfile = () => {

    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const tokens = useSelector(state => state.user.tokens);

    const [activeTab, setActiveTab] = useState('personalInfo');

    const renderContent = () => {
        switch (activeTab) {
            case 'personalInfo':
                return <PersonalInfo user={user} tokens={tokens} />;
            case 'emailPassword':
                return <EmailPassword user={user} tokens={tokens} />;
            case 'verification':
                return <Verifivation user={user} tokens={tokens} />;
            default:
                return <PersonalInfo user={user} tokens={tokens} />;
        }
    };


    return (
        <div className="flex md:flex-row flex-col md:gap-0 gap-8">
            <div className="w-full md:w-1/4 md:h-screen md:border-r">
                <div
                    className={`p-2 cursor-pointer font-semibold ${activeTab === 'personalInfo' ? 'bg-gray-300 text-black' : 'bg-white text-gray-400'}`}
                    onClick={() => setActiveTab('personalInfo')}
                >
                    Personal Info
                </div>
                <div
                    className={`p-2 mt-2 cursor-pointer font-semibold ${activeTab === 'emailPassword' ? 'bg-gray-300 text-black' : 'bg-white text-gray-400'}`}
                    onClick={() => setActiveTab('emailPassword')}
                >
                    Email & Password
                </div>
                <div
                    className={`p-2 mt-2 cursor-pointer font-semibold ${activeTab === 'verification' ? 'bg-gray-300 text-black' : 'bg-white text-gray-400'}`}
                    onClick={() => setActiveTab('verification')}
                >
                    Verification
                </div>
            </div>
            <div className="w-full md:w-3/4 px-4">
                {renderContent()}
            </div>
        </div>
    );
}
const PersonalInfo = ({ user, tokens }) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        profilePicture: user?.profile_pic_url || '',
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        address: user?.address || '',
        areaOfInterest: user?.area_of_interest || '',
        bio: user?.bio || '',
        phone: user?.phone_number || '',
        galleryImages: user?.gallery_images || [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setFormData({ ...formData, areaOfInterest: values });
    };

    const handleImageChange = (url) => {
        setFormData({ ...formData, profilePicture: url });
    };

    const handleUpdate = async () => {
        setLoading(true);

        let galleryImages = formData.galleryImages;
        if (galleryImages.length > 0) {
            try {
                const uploadedImages = await UploadMultipleImagesToCloud(galleryImages);
                galleryImages = uploadedImages;
            } catch (error) {
                setFormData(prevFormData => ({ ...prevFormData, galleryImages: [] }));
                toast.error('Failed to upload gallery images');
                setLoading(false);
                return;
            }
        }


        let formApiData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            address: formData.address,
            area_of_interest: Array.isArray(formData.areaOfInterest) ? formData.areaOfInterest.join(',') : formData.areaOfInterest,
            bio: formData.bio,
            profile_pic_url: formData.profilePicture,
            phone_number: formData.phone,
            gallery_images: galleryImages
        };

        if (formData.profilePicture !== user?.profile_pic_url) {
            try {
                const uploadedImageUrl = await UploadSingleImageToCloud(formData.profilePicture);
                formApiData.profile_pic_url = uploadedImageUrl;

            } catch (error) {
                setFormData(prevFormData => ({ ...prevFormData, profile_pic_url: '' }));
                toast.error('Failed to upload profile picture');
                return;
            }
        }

        for (const key in formApiData) {
            if (formApiData[key] === '') {
                toast.error(`${key} cannot be empty`);
                setLoading(false);
                return;
            }
        }

        await updateInvestorPersonalInfo(tokens.access, user?.id, formApiData)
            .then((response) => {
                toast.success('Profile updated successfully');
                dispatch(setUser(
                    {
                        ...user,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        address: formData.address,
                        area_of_interest: formApiData.area_of_interest,
                        bio: formData.bio,
                        profile_pic_url: formData.profilePicture,
                        phone_number: formData.phone,
                        gallery_images: galleryImages,
                    }));
                setLoading(false);
            }
            ).catch((error) => {
                toast.error('Failed to update profile');
                setLoading(false);
            });
    };


    const handleImagesChange = (imageString) => {
        setFormData({ ...formData, galleryImages: imageString });
        console.log('Uploaded images:', imageString);
    };


    return (
        <div>
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
            <h2 className="tracking-tighter text-2xl font-bold mb-4">Personal Info</h2>
            <div className="grid grid-cols-2 gap-x-4 items-start">
                <div className="w-full col-span-2 flex flex-row items-center justify-center mt-4 mb-8 border-b">
                    <ImageField
                        label="Profile Picture"
                        name="profilePicture"
                        onChange={handleImageChange}
                        defaultValue={formData.profilePicture}
                    />
                </div>
                <div className="w-full col-span-2 flex flex-col items-center md:justify-start justify-center mt-4 mb-8 border-b">
                    <MultiImageField
                        onChange={handleImagesChange}
                        defaultValues={formData.galleryImages}
                    />
                </div>
                <InputBox
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <InputBox
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <InputBox
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <InputBox
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                <div className="col-span-2">
                    <label className='text-sm text-primary'>Area of Interest</label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        value={AreaOFIntrest.filter(option => formData.areaOfInterest.includes(option.value))}
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
                <div className="col-span-2">
                    <TextArea
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button
                onClick={handleUpdate}
                className="w-full md:w-1/3 bg-primary text-white px-4 py-2 rounded-lg mt-4 hover:bg-white hover:text-primary border border-primary"
            >
                Update
            </button>
        </div>
    );
};


export default InvestorsProfile;
