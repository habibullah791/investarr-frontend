import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FiMenu, FiX } from 'react-icons/fi';
import { MdVerified } from "react-icons/md";

import Logo from '../../../Assets/Logo.png';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../../store/user/userSlice';

const Navbar = () => {
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [resourceDropdownOpen, setResourceDropdownOpen] = useState(false);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const tokens = useSelector(state => state.user.tokens);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleResourceDropdown = () => {
        setResourceDropdownOpen(!resourceDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const closeResourceDropdown = () => {
        setResourceDropdownOpen(false);
    };

    const handleLogout = async () => {
        try {
            dispatch(clearUser());
            toast.success("Logged out successfully!");
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div
            className={`w-full ${scrolled ? "bg-white shadow-md" : "bg-white"
                } transition-all duration-300`}
        >
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    style: {
                        backgroundColor: '#483BBF',
                        border: '1px solid #483BBF',
                        padding: '7px 12px',
                        color: '#FFFFFF',
                        fontWeight: '400',
                        borderRadius: '15px',
                    },
                    iconTheme: {
                        secondary: '#FFFFFF',
                    },
                }}
            />
            <header
                role="banner"
                className="flex flex-row justify-between items-center mx-auto w-4/5 py-5"
            >
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-xl md:text-3xl font-nter">
                        <img src={Logo} alt="logo" className="w-44 h-12" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    {mobileMenuOpen ? (
                        <div className="flex justify-end p-4">
                            <FiX className="text-white text-2xl cursor-pointer" onClick={closeMobileMenu} />
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            {isAuthenticated && (
                                <li class="relative list-none">
                                    <button
                                        onClick={toggleDropdown}
                                        className="text-base focus:outline-none"
                                    >
                                        <img
                                            src={user?.profile_pic_url}
                                            alt="profile"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </button>
                                    {dropdownOpen && (
                                        <ul className="w-40 absolute top-full right-2 bg-white shadow-lg rounded-md mt-2 border border-gray-200">
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                    onClick={closeDropdown}
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/message"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                    onClick={closeDropdown}
                                                >
                                                    Messages
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200 focus:outline-none"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            )}
                            <FiMenu className="text-2xl cursor-pointer" onClick={toggleMobileMenu} />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="hidden md:block">
                    <nav role="navigation" className="flex flex-row">
                        <ul className="flex justify-end items-center gap-12">
                            <li>
                                <Link to="/" className="text-base hover:text-primary">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/find-investors" className="text-base hover:text-primary">
                                    Find Investor
                                </Link>
                            </li>
                            <li>
                                <Link to="/find-investees" className="text-base hover:text-primary">
                                    Find Startups
                                </Link>
                            </li>
                            <li className="relative flex items-center">
                                <div className="absolute inset-0 border-2 border-dashed border-primary rounded-lg animate-pulse"></div>
                                <Link to="/certified-users" className="relative z-10 flex items-center text-base hover:text-primary px-4 py-2">
                                    Certified
                                    <MdVerified className="ml-2 text-primary text-xl" />
                                </Link>
                            </li>
                            <li className="relative">
                                <button
                                    onClick={toggleResourceDropdown}
                                    className="text-base focus:outline-none"
                                >
                                    Resources
                                </button>
                                {resourceDropdownOpen && (
                                    <ul className="w-40 absolute top-full left-0 bg-white shadow-md rounded-md mt-2">
                                        <li>
                                            <Link
                                                to="/learning-room"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                onClick={closeResourceDropdown}
                                            >
                                                Learning Room
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/contact-us"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                onClick={closeResourceDropdown}
                                            >
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/about"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                onClick={closeResourceDropdown}
                                            >
                                                About Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/faq"
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                                onClick={closeResourceDropdown}
                                            >
                                                FAQ
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            {/* Conditionally render dropdown menu for authenticated users */}
                            {isAuthenticated ? (
                                <li className="relative">
                                    <button
                                        onClick={toggleDropdown}
                                        className="text-base focus:outline-none"
                                    >
                                        <img
                                            src={user?.profile_pic_url}
                                            alt="profile"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    </button>
                                    {dropdownOpen && (
                                        <ul className="w-40 absolute top-full left-0 bg-white shadow-md rounded-md mt-2">
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                    onClick={closeDropdown}
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/message"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                    onClick={closeDropdown}
                                                >
                                                    Messages
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-200 focus:outline-none"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" className="text-xl">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="text-xl bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border hover:border-primary">
                                            Create Account
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed top-0 left-0 w-full h-[70vh] px-8 bg-primary">
                        <div className="flex justify-start py-4">
                            <FiX className="text-white text-3xl font-bold cursor-pointer" onClick={closeMobileMenu} />
                        </div>
                        <nav role="navigation" className="flex flex-col gap-8 items-start">
                            <div className="flex flex-col items-start gap-2">
                                <Link to="/" className="text-xl md:text-3xl font-nter">
                                    <img src={Logo} alt="logo" className="w-64 h-16" />
                                </Link>
                            </div>
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-base text-white"
                                        onClick={closeMobileMenu}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/find-investors"
                                        className="text-base text-white"
                                        onClick={closeMobileMenu}
                                    >
                                        Find Investor
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/find-investees"
                                        className="text-base text-white"
                                        onClick={closeMobileMenu}
                                    >
                                        Find Startups
                                    </Link>
                                </li>
                                <li className="relative">
                                    <button
                                        onClick={toggleResourceDropdown}
                                        className="text-white text-base focus:outline-none"
                                    >
                                        Resources
                                    </button>
                                    {resourceDropdownOpen && (
                                        <ul className="w-40 absolute top-full left-0 bg-white shadow-md rounded-md mt-2">
                                            <li>
                                                <Link
                                                    to="/learning-room"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                    onClick={closeResourceDropdown}
                                                >
                                                    Learning Room
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/contact-us"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                    onClick={closeResourceDropdown}
                                                >
                                                    Contact Us
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/about"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 border-b"
                                                    onClick={closeResourceDropdown}
                                                >
                                                    About Us
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/faq"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                                    onClick={closeResourceDropdown}
                                                >
                                                    FAQ
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                {!isAuthenticated && (
                                    <div className="flex flex-row gap-2">
                                        <li>
                                            <Link to="/login" className="text-white text-base">
                                                Login
                                            </Link>
                                        </li>
                                        <div className="text-white">
                                            |
                                        </div>
                                        <li>
                                            <Link to="/signup" className="text-white text-base">
                                                Create Account
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </ul>
                        </nav>
                    </div>
                )
                }
            </header >
        </div >
    );
};

export default Navbar;
