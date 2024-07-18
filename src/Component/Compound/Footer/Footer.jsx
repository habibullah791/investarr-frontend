import React from "react";

import Logo from '../../../Assets/Logo/cover.png';
import { CgArrowTopRight } from "react-icons/cg";
import { Link } from "react-router-dom";

const Footer = () => {
    return (

        <footer className='w-full flex justify-center items-start py-12 bg-quaternary'>
            <div className='w-11/12 md:w-4/5 flex flex-col md:flex-row justify-between items-start'>
                <div className="w-full md:w-1/3 flex flex-col items-start">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-44 h-20 object-contain"
                    />
                    <p className="text-slate-300 md:text-left">Investarr is a platform that provides you with the best investment opportunities in the market. We provide you with the best investment opportunities in the market.</p>
                </div>
                <div className="w-full md:w-1/3 mt-20 flex flex-row md:justify-end gap-4">
                    <div className="flex flex-row items-center gap-4">
                        <Link to="/" className="text-slate-300 underline flex flex-row items-center">
                            <h4>Home</h4>
                            <CgArrowTopRight className="text-slate-300" />
                        </Link>
                        <Link to="/about" className="text-slate-300 underline flex flex-row items-center">
                            <h4>About</h4>
                            <CgArrowTopRight className="text-slate-300" />
                        </Link>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <Link to="/contact-us" className="text-slate-300 underline flex flex-row items-center">
                            <h4>Contact</h4>
                            <CgArrowTopRight className="text-slate-300" />
                        </Link>
                        <Link to="/privacy" className="text-slate-300 underline flex flex-row items-center">
                            <h4>Privacy</h4>
                            <CgArrowTopRight className="text-slate-300" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;