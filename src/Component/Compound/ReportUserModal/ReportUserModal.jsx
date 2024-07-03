import React, { useState } from 'react';
import Modal from 'react-modal';
import { IoIosCloseCircle } from "react-icons/io";
import Dropdown from '../../Atom/DropDown/DropDown';
import TextArea from '../../Atom/TextArea/TextArea';

import ReportIcon from '../../../Assets/Icons/ReportIcon.png'

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '53%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', // Adjusted for mobile
        maxWidth: '400px', // Adjusted for larger screens
        padding: '10px',
        border: '2px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

const ReportUserModal = ({ isOpen, onRequestClose }) => {
    const [reportReason, setReportReason] = useState('');
    const [reportDescription, setReportDescription] = useState('');

    const handleReport = () => {
        // Handle report submission logic here
        console.log('Reporting user with reason:', reportReason);
        console.log('Report description:', reportDescription);
        onRequestClose(); // Close modal after reporting
    };

    const reportOptions = [
        { value: 'harassment', label: 'Harassment' },
        { value: 'spam', label: 'Spam' },
        { value: 'inappropriate content', label: 'Inappropriate Content' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Report User Modal"
            style={customStyles}
        >
            <div className="flex flex-col justify-center items-center py-5 px-4">
                <div className='w-full flex justify-end'>
                    <IoIosCloseCircle
                        className="text-primary text-xl cursor-pointer"
                        onClick={onRequestClose}
                    />
                </div>
                <div className='items-center'>
                    <div className="flex flex-col items-center mb-4 gap-4">
                        <img
                            src={ReportIcon}
                            alt="Report Icon"
                            className="w-12 h-12"
                        />
                        <h2 className="tracking-tighter text-primary text-2xl font-bold">Report the User</h2>
                    </div>
                    <hr className="w-4/5 mb-4" />
                    <p className="mb-4 text-center">
                        What do you want to report about?
                    </p>
                    <Dropdown
                        options={reportOptions}
                        placeholder="Select a reason"
                        name="reportReason"
                        required
                        onChange={(e) => setReportReason(e.target.value)}
                    />
                    <TextArea
                        label="Description"
                        placeholder="Describe the issue in detail..."
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                    />
                    <button
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-white hover:text-primary border border-primary hover:border-primary transition duration-300 ease-in-out mt-4"
                        onClick={handleReport}
                    >
                        Report
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ReportUserModal;
