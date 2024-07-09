import React, { useEffect, useState } from 'react';
import { getUserCertifiedUsers } from '../../../api/User/User';
import { useSelector } from 'react-redux';
import { selectTokens, selectIsAuthenticated } from '../../../store/user/userSlice';
import ResourceFinder from '../../Compound/ResourceFinder/ResourceFinder';

const CertifiedUsers = () => {
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const tokens = useSelector(selectTokens);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        getUserCertifiedUsers(tokens.access)
            .then((data) => {
                setVerifiedUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [tokens.access]);

    return (
        <div className='w-full flex justify-center items-start my-8'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-between items-stretch gap-8'>
                <div className='flex flex-col gap-3 justify-start items-start'>
                    <h1 className='text-4xl font-bold text-primary'>Certified Investors & Startups</h1>
                    <p className='text-sm text-secondary'>Connect with certified investors and discover promising startups</p>
                </div>
                <ResourceFinder
                    resourceData={verifiedUsers}
                    title='Find Investors'
                    desc='Find the best investors for your startup'
                />
            </div>
        </div>
    );
}

export default CertifiedUsers;
