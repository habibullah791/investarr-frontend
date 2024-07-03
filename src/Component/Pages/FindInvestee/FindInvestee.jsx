import React, { useEffect, useState } from 'react';

import ResourceFinder from '../../Compound/ResourceFinder/ResourceFinder';
import Spinner from '../../Atom/Spinner/Spinner';

import { fetchInvesteeData } from "../../../api/User/User";


const FindInvestees = () => {
    const [InvesteeData, setInvesteeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const InvesteeResponse = await fetchInvesteeData();
                console.log(InvesteeResponse);
                setInvesteeData(InvesteeResponse);

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
                    <h1 className='text-4xl font-bold text-primary'>Investees</h1>
                    <p className='text-sm text-secondary'>Find the best Investees for your startup</p>
                </div>
                <ResourceFinder
                    resourceData={InvesteeData}
                    title='Find Investees'
                    desc='Find the best Investees for your startup'
                />
            </div>
        </div>
    )
}

export default FindInvestees