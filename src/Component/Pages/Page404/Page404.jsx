import React from 'react';
import page404Img from '../../../Assets/404_IMG.png';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className='w-full flex justify-center items-start my-16'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-center items-center gap-8'>
                <img
                    src={page404Img}
                    alt="404"
                    className='w-64 mb-8'
                />
                <div className='flex flex-col gap-3 justify-center items-center'>
                    <h2 className='text-primary text-4xl font-bold'>Oops! We’ve lost this page</h2>
                    <p className='text-center text-gray-400'>Sorry, this page you are looking for doesn’t exist or has been moved.</p>
                </div>
                <Link
                    to='/'
                    className='text-white bg-primary py-2 px-4 rounded-md hover:bg-white hover:text-primary border border-primary'
                >
                    Go to Home
                </Link>

            </div>
        </div>

    )
}

export default Page404;