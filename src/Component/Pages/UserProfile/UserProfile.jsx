import React, { useEffect, useState } from 'react';  // Import useState from React
import { Link, useParams } from 'react-router-dom';
import { MdBlockFlipped, MdOutlineReportProblem, MdEmail, MdLocationOn } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { TiSupport } from "react-icons/ti";

import { fetchUserData } from '../../../api/User/User';
import { PersonalInformation, StartupInformation } from './about.data';
import { useSelector } from 'react-redux';
import { selectTokens, selectIsAuthenticated } from '../../../store/user/userSlice';

import LegalSupportModal from '../../Compound/LegalSupportModal/LegalSupportModal';
import BlockUserModal from '../../Compound/BlockUserModal/BlockUserModal';
import ReportUserModal from '../../Compound/ReportUserModal/ReportUserModal';


const UserProfile = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [blockUserModalOpen, setBlockUserModalOpen] = useState(false);
    const [reportUserModalOpen, setReportUserModalOpen] = useState(false);
    const [legalSupportModalOpen, setLegalSupportModalOpen] = useState(false); // Fix for useState

    const tokens = useSelector(selectTokens);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        fetchUserData(tokens.access, id)
            .then((data) => {
                setUserData(data);
                console.log('User data:', data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [id, tokens.access]);

    const handleModalOpen = (modalType) => {
        console.log(`Opening ${modalType} modal`);
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
            <div className='w-4/5 flex flex-col justify-between items-start'>
                <h1 className='text-2xl font-bold'>User Profile</h1>
                <div className='flex flex-row items-end space-x-6 my-10'>
                    <div className='flex flex-col justify-center items-center space-y-4'>
                        <img
                            src={userData?.profile_pic_url}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <Link
                            to={`/message/${id}`}
                            className="w-full bg-primary text-white px-4 py-2 rounded-md text-center"
                            title="Send Message"
                        >
                            Message
                        </Link>
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
                    <div className='flex flex-col'>
                        {details.map((detail, index) => (
                            <div key={index} className='flex items-center space-x-2'>
                                {detail.icon}
                                <p className='text-lg'>{detail.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <CustomInformation title="Personal Information" data={PersonalInformation(userData)} />
                {userData?.user_type === 'Investee' && (
                    <CustomInformation title="Startup Information" data={StartupInformation(userData)} />
                )}
            </div>

            {/* Modals */}
            <BlockUserModal isOpen={blockUserModalOpen} onRequestClose={() => setBlockUserModalOpen(false)} />
            <ReportUserModal isOpen={reportUserModalOpen} onRequestClose={() => setReportUserModalOpen(false)} />
            <LegalSupportModal isOpen={legalSupportModalOpen} onRequestClose={() => setLegalSupportModalOpen(false)} />
        </div>
    );
};

export default UserProfile;


const CustomInformation = ({ title, data, description }) => {
    return (
        <div className="flex flex-col space-y-4 mt-4 mb-10"> {/* Add spacing for better readability */}
            <div className="text-lg font-bold">  {/* Emphasize title */}
                {title}
            </div>
            {data && (
                <div className="grid grid-cols-1 gap-4 shadow-lg rounded-lg overflow-hidden py-12 px-3">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white p-4 w-4/5">
                            <p className="font-bold text-blue-500">{item.title}</p>
                            {Array.isArray(item.label) ? (
                                <ul className="list-disc pl-4"> {/* Consistent list styling */}
                                    {item.label.map((label, index) => (
                                        <li key={index}>
                                            <p>{label}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="">{item.label}</p>
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
