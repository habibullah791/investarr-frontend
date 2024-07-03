import React from 'react';

const InputBox = ({ label, placeholder, ...props }) => {
    return (
        <div className='flex flex-col my-1'>
            <label className='text-sm text-primary'>{label}</label>
            <input
                className="border-2 border-primary rounded-lg py-5 pl-2 w-full h-8 focus:border-secondary-color focus:outline-none"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};

export default InputBox;
