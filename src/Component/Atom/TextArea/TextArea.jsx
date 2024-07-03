import React from 'react';

const TextArea = ({ label, placeholder, ...props }) => {
    return (
        <div className='flex flex-col my-2'>
            <label className='text-sm text-primary'>{label}</label>
            <textarea
                className="border-2 border-primary rounded-lg py-2 px-2 w-full h-32 focus:border-secondary-color focus:outline-none resize-none"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default TextArea;
