import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import { MdVerified } from "react-icons/md";

import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../store/user/userSlice';
import LoginModal from '../../Compound/LoginModal/LoginModal';



const ResourceFinder = ({ resourceData, title, desc, route, isHoemPage = false }) => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const handleUserProfile = (id) => () => {
        if (!isAuthenticated) {
            setShowModal(true);
        } else {
            navigate(`/user-profile/${id}`);
        }
    };

    return (
        <>
            <div className='w-full flex flex-col justify-start items-start gap-5'>
                {isHoemPage && (
                    <div className='w-full flex flex-col md:flex-row justify-between items-center'>
                        <div className='flex flex-col gap-2 md:gap-3 md:justify-start justify-center items-center md:items-start mb-7 md:mb-0'>
                            <h1 className='text-4xl font-bold text-primary'>{title}</h1>
                            <p className='text-sm text-secondary'>{desc}</p>
                        </div>
                        <Link to={route} className='w-full md:w-1/4 text-xl bg-primary text-center text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border hover:border-primary'>
                            View All
                        </Link>
                    </div>
                )}
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8'>
                    {resourceData.map((data) => (
                        data.user_type === 'Investee' ? (
                            <div key={data.id} className='flex flex-col justify-start items-start shadow-md rounded mb-4'>
                                <Link
                                    onClick={handleUserProfile(data.id)}
                                    className='w-full'
                                >
                                    <img src={data.profile_pic_url} alt={`${data.first_name} ${data.last_name}`} className='w-full h-64 object-cover' />
                                </Link>
                                <div className='flex flex-col p-4'>
                                    <div className='flex flex-row gap-2 items-center w-full'>
                                        <Link
                                            onClick={handleUserProfile(data.id)}
                                        >
                                            <h1 className='text-lg font-bold text-primary'>{`${data.username}`}</h1>
                                        </Link>
                                        <div className=''>
                                            {data.verification_status === 'Basic' ? (
                                                <></>
                                            ) : (
                                                <MdVerified className='text-primary' />
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <p className='text-gray-400 text-xs'>{data.address}</p>
                                        <FaLocationDot className='text-primary' />
                                    </div>
                                    <div className='flex flex-col gap-2 mt-2'>
                                        <p className='text-sm text-secondary'> {data.startup_name}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div key={data.id} className='flex flex-col justify-start items-start shadow-md rounded mb-4'>
                                <Link
                                    onClick={handleUserProfile(data.id)}
                                    className='w-full'
                                >
                                    <img src={data.profile_pic_url} alt={`${data.first_name} ${data.last_name}`} className='w-full h-64 object-cover' />
                                </Link>
                                <div className='flex flex-col p-4'>
                                    <div className='flex flex-row gap-2 items-center w-full'>
                                        <Link
                                            onClick={handleUserProfile(data.id)}
                                        >
                                            <h1 className='text-lg font-bold text-primary'>{`${data.username}`}</h1>
                                        </Link>
                                        <div className=''>
                                            {data.verification_status === 'Basic' ? (
                                                <></>
                                            ) : (
                                                <MdVerified className='text-primary' />
                                            )}
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-2 items-center'>
                                        <p className='text-gray-400 text-xs'>{data.address}</p>
                                        <FaLocationDot className='text-primary' />
                                    </div>
                                    <div className='flex flex-col gap-2 mt-2'>
                                        <p className='text-sm text-secondary'> Looking for {data.area_of_interest.split(',')[0]}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <LoginModal show={showModal} handleClose={handleClose} />
        </>
    );
};

export default ResourceFinder;
