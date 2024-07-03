import React, { useState, useEffect } from 'react';
import { CiCamera } from "react-icons/ci";


const ImageField = ({ onChange, defaultValue }) => {
    const [profilePic, setProfilePic] = useState(defaultValue || null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
                onChange(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        setProfilePic(defaultValue || null);
    }, [defaultValue]);

    const renderPreview = () => {
        if (profilePic) {
            return (
                <div
                    className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ backgroundImage: `url(${profilePic})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>
            );
        } else {
            return (
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
                    <CiCamera
                        className="text-gray-500"
                        size={32}
                    />
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col items-center pb-5">
            {/* Circular profile picture placeholder */}
            <label htmlFor="profilePicInput" className="relative">
                {renderPreview()}
            </label>
            {/* Input field for profile picture */}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="profilePicInput"
            />
            <h3 className="text-sm text-gray-500 mt-2">Upload Profile Picture</h3>
        </div>
    );
};

export default ImageField;
