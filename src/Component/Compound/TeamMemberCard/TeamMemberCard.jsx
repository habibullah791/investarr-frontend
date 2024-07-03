import React from 'react';

const TeamMemberCard = ({ member }) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
                <img
                    src={member.image}
                    alt={member.title}
                    className='w-full h-64 object-cover rounded-xl'
                />
            </div>
            <div className='flex flex-col gap-3'>
                <h3 className='text-lg font-medium leading-none'>{member.title}</h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{member.subtitle}</p>
            </div>
            <p className='text-sm text-black'>{member.description}</p>
        </div>
    )
}

export default TeamMemberCard;
