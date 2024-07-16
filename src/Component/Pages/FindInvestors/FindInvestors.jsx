import React, { useEffect, useState } from 'react';

import Spinner from '../../Atom/Spinner/Spinner';
import ResourceFinder from '../../Compound/ResourceFinder/ResourceFinder';
import FilterDropdown from '../../Atom/FilterDropdown/FilterDropdown';

import { fetchInvestorData } from "../../../api/User/User";
import { AreaOFIntrest } from '../../../Constant/constants';

const FindInvestors = () => {
    const [investorData, setInvestorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        verification_status: '',
        area_of_interest: [],
        address: '',
        username: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const investorResponse = await fetchInvestorData();
                setInvestorData(investorResponse);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = investorData?.filter(data => {
        return (
            (filters.verification_status ? data.verification_status === filters.verification_status : true) &&
            (filters.area_of_interest.length ? filters.area_of_interest.some(area => data.area_of_interest.includes(area)) : true) &&
            (filters.address ? data.address.includes(filters.address) : true) &&
            (filters.username ? data.username.includes(filters.username) : true)
        );
    });


    if (loading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className='w-full flex justify-center items-start my-8'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-between items-stretch gap-8'>
                <div className='w-full flex flex-col md:flex-row justify-between items-center gap-4'>
                    <div className='flex flex-col gap-3 justify-center md:justify-start items-center md:items-start'>
                        <h1 className='text-4xl font-bold text-primary'>Investors</h1>
                        <p className='text-sm text-secondary'>Find the best investors for your startup</p>
                    </div>
                    <div className='w-full md:w-28'>
                        <FilterDropdown
                            filters={filters}
                            setFilters={setFilters}
                            AreaOFIntrest={AreaOFIntrest}
                        />
                    </div>
                </div>
                <ResourceFinder
                    resourceData={filteredData}
                    title='Find Investors'
                    desc='Find the best investors for your startup'
                />
            </div>
        </div>
    )
}

export default FindInvestors