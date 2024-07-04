import React, { useState } from 'react';
import { FiImage, FiX } from "react-icons/fi";

const MultiImageField = ({ onChange, defaultValues = [] }) => {
    const [galleryImages, setGalleryImages] = useState(defaultValues);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const newImages = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                newImages.push(reader.result);
                if (newImages.length === files.length) {
                    setGalleryImages([...galleryImages, ...newImages]);
                    onChange([...galleryImages, ...newImages]);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...galleryImages];
        updatedImages.splice(index, 1);
        setGalleryImages(updatedImages);
        onChange(updatedImages);
    };

    return (
        <div className="w-full flex flex-col items-center pb-5">
            <label htmlFor="galleryInput" className="relative flex flex-col gap-2 items-center justify-center w-full h-36 bg-gray-200 border border-gray-300 cursor-pointer rounded-lg">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                    id="galleryInput"
                />
                <FiImage className="text-gray-500" size={24} />
                <span className="text-sm text-gray-500 ml-2">Upload Images</span>
            </label>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
                {galleryImages.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-full md:w-40 h-36 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer m-2"
                        style={{
                            width: '100%',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <button
                            className="absolute top-1 right-1 p-1 rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
                            onClick={() => handleRemoveImage(index)}
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default MultiImageField;
