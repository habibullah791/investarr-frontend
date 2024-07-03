import React from 'react';

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className='border border-gray-300 rounded-lg px-4 py-6'>
            <div className='flex items-center gap-4'>
                <img src={testimonial.image} alt={testimonial.name} className='w-12 h-12 object-cover rounded-full' />
                <div>
                    <p className='text-sm font-medium'>{testimonial.name}</p>
                    <p className='text-sm text-gray-500'>{testimonial.title}</p>
                </div>
            </div>
            <p className='text-sm text-gray-600 mt-2'>{testimonial.review}</p>
        </div>
    );
}

const TestimonialSection = ({ testimonialSectionData }) => {
    return (
        <div className='w-full flex justify-center items-center my-32'>
            <div className='w-11/12 lg:w-4/5 flex flex-col lg:flex-col justify-center items-center gap-12'>
                <div className='text-center'>
                    <h2 className='text-3xl font-bold text-primary tracking-tighter'>{testimonialSectionData.title}</h2>
                    <p className='text-gray-600 text-lg'>{testimonialSectionData.description}</p>
                </div>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                    {testimonialSectionData.testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TestimonialSection;
