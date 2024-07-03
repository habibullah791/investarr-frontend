import React from 'react'
import UserForm from '../../Compound/UserForm/UserForm'
import imageSrc from '../../../Assets/HeroBanner_1.png';


const SignUp = () => {
    return (
        <div className='w-full flex justify-center items-start'>
            <div className='w-4/5 flex flex-row justify-between items-start my-10'>
                <UserForm />
            </div>
        </div>
    )
}

export default SignUp;