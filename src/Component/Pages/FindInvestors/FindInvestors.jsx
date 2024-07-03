import React, { useEffect, useState } from 'react';

import ResourceFinder from '../../Compound/ResourceFinder/ResourceFinder';
import Spinner from '../../Atom/Spinner/Spinner';

import { fetchInvestorData } from "../../../api/User/User";


const FindInvestors = () => {
    const [investorData, setInvestorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const investorResponse = await fetchInvestorData();
                console.log(investorResponse);
                setInvestorData(investorResponse);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className='w-full flex justify-center items-start my-8'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-between items-stretch gap-8'>
                <div className='flex flex-col gap-3 justify-start items-start'>
                    <h1 className='text-4xl font-bold text-primary'>Investors</h1>
                    <p className='text-sm text-secondary'>Find the best investors for your startup</p>
                </div>
                <ResourceFinder
                    resourceData={investorData}
                    title='Find Investors'
                    desc='Find the best investors for your startup'
                />
            </div>
        </div>
    )
}

export default FindInvestors