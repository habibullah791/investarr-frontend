import React from 'react';

const Dropdown = ({ options, placeholder, name, required, onChange, ...props }) => {
    return (
        <div className='flex flex-col py-1 justify-center'>
            <label className='text-sm text-primary'>{placeholder}</label>
            <select
                required={required}
                onChange={onChange}
                name={name}
                className="border-2 border-primary rounded-lg py-1 pr-5 pl-2 w-full h-10 focus:border-secondary-color focus:outline-none"
                {...props}
            >
                {placeholder && <option value="" disabled hidden>{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
