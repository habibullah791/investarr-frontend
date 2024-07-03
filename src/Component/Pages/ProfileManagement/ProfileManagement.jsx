import React from 'react'
import { useSelector } from 'react-redux';

import InvestorsProfile from './InvestorsProfile/InvestorsProfile';
import InvesteesProfie from './InvesteesProfie/InvesteesProfie'

const ProfileManagement = () => {

    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <div className='w-full flex justify-center items-start my-8'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-between items-stretch gap-12'>
                <h1 className='text-3xl font-bold'>Profile Management</h1>
                {user && user.user_type === "Investor" ? <InvestorsProfile /> : <InvesteesProfie />}
            </div>
        </div>
    )
}

export default ProfileManagement