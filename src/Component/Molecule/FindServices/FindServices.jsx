import React from 'react';
import ResourceFinder from '../../Compound/ResourceFinder/ResourceFinder';

const FindServices = ({ investorData, investeeData }) => {

    return (
        <div className='w-full flex justify-center items-start pt-32 pb-12'>
            <div className='w-11/12 md:w-4/5 flex flex-wrap justify-start items-center'>
                <div className='w-full flex flex-col gap-24 justify-start items-center mt-8'>
                    {investorData && (
                        <ResourceFinder
                            resourceData={investorData.slice(0, 4)}
                            title='For Investors'
                            desc='Invest in the best startups in the world today'
                            route='/find-investors'
                            isHoemPage={true}
                        />
                    )}
                    {investeeData && (
                        <ResourceFinder
                            resourceData={investeeData.slice(0, 4)}
                            title='For Investees'
                            desc='Find the best investors for your startup today'
                            route='/find-investees'
                            isHoemPage={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default FindServices;
