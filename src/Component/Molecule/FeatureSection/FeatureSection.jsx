import React from 'react';
import DescriptionCard from '../../Compound/DescriptionCard/DescriptionCard';

const FeatureSection = ({ featuresSectionData }) => {
    return (
        <div className='w-full flex justify-center items-center mt-32'>
            <div className='w-11/12 lg:w-4/5 flex flex-col lg:flex-col justify-center items-center gap-12'>
                <div className='w-4/5 text-center'>
                    <h1 className='tracking-tighter text-4xl font-bold text-primary'>{featuresSectionData.title}</h1>
                    <p className='text-gray-600 text-lg'>{featuresSectionData.description}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3">
                    {featuresSectionData.featureCardData.map((feature, index) => (
                        <div
                            className={`${index === 0 ? 'border-r border-b border-gray-300' :
                                index === 1 ? 'border-r border-b border-gray-300' :
                                    index === 2 ? 'border-b border-gray-300' :
                                        index === 3 ? 'border-r border-gray-300' :
                                            index === 4 ? 'border-r border-gray-300' :
                                                ''
                                }`}
                        >
                            <DescriptionCard
                                key={index}
                                title={feature.title}
                                description={feature.description}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
