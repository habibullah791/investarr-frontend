import React from 'react';

const DescriptionCard = ({ title, description }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="tracking-tighter text-xl font-bold text-primary">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default DescriptionCard;
