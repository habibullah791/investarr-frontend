import React, { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

import InputBox from '../InputBox/InputBox';

const animatedComponents = makeAnimated();

const verificationOptions = [
    { value: '', label: 'All Verification Status' },
    { value: 'Basic', label: 'Basic' },
    { value: 'Verified', label: 'Verified' },
];

const FilterDropdown = ({ filters, setFilters, AreaOFIntrest }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleVerificationChange = (selectedOption) => {
        setFilters({
            ...filters,
            verification_status: selectedOption ? selectedOption.value : ''
        });
    };

    const handleSelectChange = (selectedOptions) => {
        setFilters({
            ...filters,
            area_of_interest: selectedOptions ? selectedOptions.map(option => option.value) : []
        });
    };

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='relative'>
            <button
                onClick={handleDropdownToggle}
                className='w-full flex justify-between gap-2 items-center p-2 border border-gray-300 rounded bg-white text-primary'
            >
                <span>Sort by</span>
                {isOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
            </button>
            {isOpen && (
                <div className='absolute top-full right-0 mt-2 p-4 border border-gray-300 bg-white rounded shadow-lg z-10'>
                    <div className='w-96 flex flex-col gap-4 mb-4 px-4 py-2'>
                        <div className=''>
                            <h1 className='text-lg font-bold text-primary'>Filters</h1>
                            <hr className='my-2 mb-2' />
                        </div>
                        <div className='w-full'>
                            <div className='w-full'>
                                <InputBox
                                    label={'username'}
                                    type="text"
                                    name="username"
                                    onChange={(e) => setFilters({
                                        ...filters,
                                        username: e.target.value
                                    })}
                                    value={filters.address}
                                    placeholder="Address"
                                />
                            </div>
                            <div className='w-full'>
                                <InputBox
                                    label={'Address'}
                                    type="text"
                                    name="address"
                                    onChange={(e) => setFilters({
                                        ...filters,
                                        address: e.target.value
                                    })}
                                    value={filters.address}
                                    placeholder="Address"
                                />
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-primary'>Verification Status</label>
                                <Select
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    value={verificationOptions.find(option => option.value === filters.verification_status)}
                                    onChange={handleVerificationChange}
                                    placeholder="Select Verification Status"
                                    options={verificationOptions}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            border: '2px solid #483BBF',
                                            borderRadius: '8px',
                                            padding: '5px',
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isFocused ? '#483BBF' : null,
                                            color: state.isFocused ? 'white' : null,
                                        }),
                                    }}
                                />
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-primary'>Area of Interest</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    value={AreaOFIntrest.filter(option => filters.area_of_interest.includes(option.value))}
                                    onChange={handleSelectChange}
                                    placeholder="Select Area of Interest"
                                    isMulti
                                    options={AreaOFIntrest}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            border: '2px solid #483BBF',
                                            borderRadius: '8px',
                                            padding: '5px',
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isFocused ? '#483BBF' : null,
                                            color: state.isFocused ? 'white' : null,
                                        }),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
