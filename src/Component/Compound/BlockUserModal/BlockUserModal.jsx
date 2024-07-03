import React from 'react';
import Modal from 'react-modal';

import { MdBlockFlipped } from "react-icons/md";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', // Adjusted for mobile
        maxWidth: '470px', // Adjusted for larger screens
        padding: '10px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

const BlockUserModal = ({ isOpen, onRequestClose }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Block User Modal"
            style={customStyles}
        >
            <div className="flex flex-col justify-start items-start py-4 px-6">
                <div className='bg-[#AFA8EC] rounded-full p-2 mb-5'>
                    <MdBlockFlipped
                        size={30}
                        className="text-primary"
                    />
                </div>
                <h2 className="tracking-tighter text-primary text-2xl font-bold mb-4">Block the User?</h2>
                <hr className="w-4/5 mb-4" />
                <p className="text-sm mb-4 text-gray-600">
                    You are going to block this user, here is what will happen:
                </p>
                <ul className="mb-4 text-left list-disc pl-6">
                    <li className='text-sm text-gray-600'>They will not be able to message you</li>
                    <li className='text-sm text-gray-600'>They will not be able to find your profile</li>
                    <li className='text-sm text-gray-600'>They will not appear in your search results</li>
                    <li className='text-sm text-gray-600'>They will not be notified that you blocked them</li>
                </ul>
                <div className="w-full flex justify-center space-x-4">
                    <button
                        className="w-1/2 px-4 py-2 bg-white text-primary rounded-lg  border border-primary hover:border-primary transition duration-300 ease-in-out"
                        onClick={onRequestClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-1/2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary hover:border-primary transition duration-300 ease-in-out"
                        onClick={() => {
                            onRequestClose();
                        }}
                    >
                        Block
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default BlockUserModal;
