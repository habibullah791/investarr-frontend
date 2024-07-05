import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdBlockFlipped, MdOutlineReportProblem, MdEmail, MdLocationOn } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { TiSupport } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";

import { fetchUserData, getUserVerificationStatus } from '../../../api/User/User';
import { PersonalInformation, StartupInformation, ContactInformation } from './about.data';
import { useSelector } from 'react-redux';
import { selectTokens, selectIsAuthenticated } from '../../../store/user/userSlice';

import LegalSupportModal from '../../Compound/LegalSupportModal/LegalSupportModal';
import BlockUserModal from '../../Compound/BlockUserModal/BlockUserModal';
import ReportUserModal from '../../Compound/ReportUserModal/ReportUserModal';
import CustomMessageModal from '../../Compound/CustomMessageModal/CustomMessageModal';

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [userData, setUserData] = useState(null);
    const [blockUserModalOpen, setBlockUserModalOpen] = useState(false);
    const [reportUserModalOpen, setReportUserModalOpen] = useState(false);
    const [legalSupportModalOpen, setLegalSupportModalOpen] = useState(false);
    const [showCustomMessageModal, setShowCustomMessageModal] = useState(false);
    const [CustomMessageModalMessage, setCustomMessageModalMessage] = useState({
        title: '',
        desc: '',
        buttonText: '',
        goto: ''
    });


    const tokens = useSelector(selectTokens);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const goToChatScreen = async () => {
        console.log('IS AUTHENTICATED:', isAuthenticated);
        if (!isAuthenticated) {
            alert('Please login to continue');
            return;
        }

        try {
            const data = await getUserVerificationStatus(tokens.access);
            const { membership_tier, verification_status } = data.data;

            if (membership_tier === 'Free' && verification_status === 'Basic') {
                setCustomMessageModalMessage({
                    title: 'Membership & Verification Required',
                    desc: 'You are not eligible to chat. Upgrade your membership and complete your verification to access this feature.',
                    buttonText: 'Upgrade & Verify',
                    goto: ''
                });
                setShowCustomMessageModal(true);
            } else if (membership_tier === 'Free') {
                setCustomMessageModalMessage({
                    title: 'Membership Required',
                    desc: 'You are not eligible to chat. Upgrade your membership to access this feature.',
                    buttonText: 'Upgrade',
                    goto: '/membership'
                });
                setShowCustomMessageModal(true);
            } else if (verification_status === 'Basic') {
                setCustomMessageModalMessage({
                    title: 'Verification Required',
                    desc: 'You are not eligible to chat. Complete your verification to access this feature.',
                    buttonText: 'Verify',
                    goto: '/dashboard'
                });
                setShowCustomMessageModal(true);
            } else {
                navigate(`/message/${id}`);
            }
        } catch (error) {
            console.error('Error fetching user verification status:', error);
        }
    };

    useEffect(() => {
        fetchUserData(tokens.access, id)
            .then((data) => {
                console.log('User data:', data);
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [id, tokens.access]);

    const handleModalOpen = (modalType) => {
        switch (modalType) {
            case 'block':
                setBlockUserModalOpen(true);
                break;
            case 'report':
                setReportUserModalOpen(true);
                break;
            case 'support':
                setLegalSupportModalOpen(true);
                break;
            default:
                break;
        }
    };

    const links = [
        { to: `/block/${id}`, title: 'Block User', icon: <MdBlockFlipped size={24} />, onClick: () => handleModalOpen('block') },
        { to: `/report/${id}`, title: 'Report User', icon: <MdOutlineReportProblem size={24} />, onClick: () => handleModalOpen('report') },
        { to: `/settings/${id}`, title: 'Legal Support', icon: <TiSupport size={24} />, onClick: () => handleModalOpen('support') },
    ];

    const details = [
        { icon: <FaUserAlt size={18} className='text-primary' />, label: 'Username', value: userData?.username },
        { icon: <MdEmail size={18} className='text-primary' />, label: 'Email', value: userData?.email },
        { icon: <MdLocationOn size={18} className='text-primary' />, label: 'Address', value: userData?.address }
    ];

    return (
        <div className='w-full flex justify-center items-start my-16'>
            <div className='w-11/12 md:w-4/5 grid grid-cols-12 gap-8'>
                <div className='col-span-12 md:col-span-3 flex flex-col gap-8 order-1 md:order-2'>
                    <div className='flex flex-col justify-center items-center shadow-lg rounded-lg py-6 px-4'>
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={userData?.profile_pic_url}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <div className="flex flex-col items-center">
                                <h1 className="text-xl font-bold text-text_primary">{userData?.first_name + " " + userData?.last_name}</h1>
                                <div className="flex items-center space-x-2">
                                    <FaLocationDot size={18} className='text-primary' />
                                    <p className="text-base text-text_secondary">{userData?.address}</p>
                                </div>
                            </div>
                            <Link
                                onClick={goToChatScreen}
                                className="w-full bg-primary text-white px-4 py-2 rounded-md text-center"
                                title="Send Message"
                            >
                                Message
                            </Link>
                        </div>
                        <div className="flex space-x-4 mt-5">
                            {links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={link.onClick}
                                    className="border border-primary text-primary px-3 py-2 rounded-md"
                                    title={link.title}
                                >
                                    {link.icon}
                                </button>
                            ))}
                        </div>
                    </div>
                    <CustomContactInformation title="Contact Information" data={ContactInformation(userData)} />
                    <Gallery images={userData?.gallery_images} />
                </div>
                <div className='col-span-12 md:col-span-9 order-2 md:order-1'>
                    <CustomInformation title="Personal Information" data={PersonalInformation(userData)} />
                    {userData?.user_type === 'Investee' && (
                        <CustomInformation title="Startup Information" data={StartupInformation(userData)} />
                    )}
                </div>
            </div>

            {/* Modals */}
            <BlockUserModal isOpen={blockUserModalOpen} onRequestClose={() => setBlockUserModalOpen(false)} />
            <ReportUserModal isOpen={reportUserModalOpen} onRequestClose={() => setReportUserModalOpen(false)} />
            <LegalSupportModal isOpen={legalSupportModalOpen} onRequestClose={() => setLegalSupportModalOpen(false)} />
            <CustomMessageModal
                isOpen={showCustomMessageModal}
                onRequestClose={() => setShowCustomMessageModal(false)}
                title={CustomMessageModalMessage.title}
                desc={CustomMessageModalMessage.desc}
                buttonText={CustomMessageModalMessage.buttonText}
                goto={CustomMessageModalMessage.goto}
            />
        </div>
    );
};

export default UserProfile;

const CustomInformation = ({ title, data, description }) => {
    return (
        <div className="flex flex-col space-y-4 mt-4 mb-10">
            <h2 className="text-lg font-bold text-text_primary">
                {title}
            </h2>
            {data && (
                <div className="grid grid-cols-1 shadow-lg rounded-lg overflow-hidden py-6 px-3">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white px-4 py-3">
                            <h3 className="font-bold text-text_primary">{item.title}</h3>
                            {item.title === "Area of Interest" && item.label ? (
                                <ul className='grid grid-col-1 md:grid-cols-3 list-disc list-inside mt-1'>
                                    {item.label.split(',').map((interest, index) => (
                                        <li key={index} className="text-gray-900 text-base">{interest}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p
                                    className={`w-11/12 text-base mt-1 ${item.title === 'Verification Status'
                                        ? (item.label === 'Basic'
                                            ? 'text-red-500'
                                            : (item.label === 'Level 1'
                                                ? 'text-yellow-600'
                                                : (item.label === 'Level 2'
                                                    ? 'text-green-500'
                                                    : 'text-gray-900')))
                                        : ''
                                        }`}
                                >
                                    {item.label}
                                </p>

                            )}
                        </div>
                    ))}
                </div>
            )}
            {description && (
                <p className="text-gray-700">{description}</p>
            )}
        </div>
    );
};


const CustomContactInformation = ({ data }) => {
    return (
        <div className="flex flex-col space-y-4 py-6 px-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-primary">
                Contact Information
            </h2>
            {data && (
                <div className="grid grid-cols-1 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white flex flex-col gap-1">
                            <h3 className="font-bold text-text_primary">{item.title}</h3>
                            <p className="text-gray-900">{item.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Gallery = ({ images }) => {
    return (

        <div className="flex flex-col space-y-4 py-6 px-4 shadow-lg rounded-lg">
            <h2 className="text-lg font-bold text-primary">
                Gallery
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {images && images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index + 1}`}
                        className={`w-full h-32 object-cover rounded-lg ${index === 0 ? 'col-span-1 md:col-span-2' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

