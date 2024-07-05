import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';


Modal.setAppElement('#root'); // Set the root element for accessibility

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '600px',
        padding: '10px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

const CustomMessageModal = ({ isOpen, onRequestClose, title, desc, buttonText, goto }) => {
    const [membershipType, setMembershipType] = useState('');

    const handleSelectMembership = (type) => {
        setMembershipType(type);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Membership Modal"
            style={customStyles}
        >
            <div className="flex flex-col justify-center items-center">
                <div className='w-full flex justify-end'>
                    <IoIosCloseCircle
                        className="text-primary text-xl cursor-pointer"
                        onClick={onRequestClose}
                    />
                </div>
                <div className='my-10 flex flex-col justify-center items-center'>
                    <h2 className="tracking-tighter text-primary text-2xl font-bold mb-4">{title}</h2>
                    {/* create the hr here */}
                    <hr className="w-4/5 mb-4" />
                    <p className="w-4/5 mb-4 text-center">
                        {desc}
                    </p>
                    <Link
                        to={goto ? goto : '/dashboard'}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary hover:border-primary transition duration-300 ease-in-out"
                    >
                        {goto ? buttonText : 'Go to Dashboard'}
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default CustomMessageModal;
