import React from 'react';

import TeamMemberCard from '../../Compound/TeamMemberCard/TeamMemberCard';

function InvestmentSection({ investmentTeamSectionData }) {
    return (
        <div className='w-full flex justify-center items-center mt-32'>
            <div className='w-11/12 lg:w-4/5 flex flex-col lg:flex-col justify-center items-center gap-4'>
                <div className='flex flex-col items-center justify-center text-center'>
                    <div className='mb-4'>
                        <h2 className='text-primary text-4xl font-bold tracking-tighter'>
                            {investmentTeamSectionData.title}
                        </h2>
                        <p className='text-gray-600 text-lg'>
                            {investmentTeamSectionData.description}
                        </p>
                    </div>
                </div>
                <div className='grid items-start gap-6 lg:grid-cols-3 lg:gap-12'>
                    {investmentTeamSectionData.teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InvestmentSection;
