import React, { useState } from 'react';
import { ContactUsAPI } from '../../../api/User/User';

import InputBox from '../../Atom/InputBox/InputBox';
import TextArea from '../../Atom/TextArea/TextArea';

import { FaLocationDot } from "react-icons/fa6";
import { MdCallEnd } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import ContactUsBanner from '../../../Assets/Banners/ContactUs.png';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // Update how formData is structured before sending the POST request
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ContactUsAPI({
                recipient_email: formData.email,
                subject: formData.subject,
                content: formData.message,
                name: formData.name
            });
            console.log(response);
            // Handle response as needed
        } catch (error) {
            console.error("Error submitting contact form:", error);
            // Handle error as needed
        }
    };

    return (
        <div className="flex justify-center items-start my-16">
            <div className="w-11/12 md:w-4/5 flex flex-col md:flex-row justify-between items-stretch gap-8">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
                    <div className='w-3/5'>
                        <img src={ContactUsBanner} alt="Contact Us" className="w-full h-auto" />
                    </div>
                    <div className="mt-10">
                        <p className="text-md"><FaLocationDot className="text-primary text-2xl inline mr-2" /> 123, Main Street, New York, USA</p>
                        <p className="text-md"><MdCallEnd className="text-primary text-2xl inline mr-2" /> +1 234 567 890</p>
                        <p className="text-md"><MdAlternateEmail className="text-primary text-2xl inline mr-2" /> example@gmail.com</p>
                    </div>
                    <div className="w-1/4 mt-6">
                        <div className='flex gap-4'>
                            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-2xl text-primary"><FaInstagram /></a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="text-2xl text-primary"><FaFacebookSquare /></a>
                            <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="text-2xl text-primary"><FaSquareXTwitter /></a>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6">
                    <h1 className="tracking-tighter text-primary text-2xl md:text-4xl">Contact Us</h1>
                    <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-3">
                        <div className="w-full">
                            <InputBox
                                label="Your Name"
                                placeholder="Your Name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <InputBox
                                label="Your Email"
                                placeholder="Your Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <InputBox
                                label="Subject"
                                placeholder="Subject"
                                name="subject"
                                type="text"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                            <TextArea
                                label="Your Message"
                                placeholder="Your Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border-2 hover:border-primary"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;
