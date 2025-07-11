import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='flex flex-col px-4 sm:px-6 md:px-8 lg:px-16 py-6'>

      <p className='text-center text-gray-500 text-xl sm:text-2xl font-semibold'>
        ABOUT <span className='text-black'>US</span>
      </p>

      {/*------- About Us -------*/}
      <div className='flex flex-col lg:flex-row gap-6 mt-6'>

        {/*------ Left Side -------*/}
        <div className='w-full flex justify-center'>
          <img
            src={assets.about_image}
            alt="About Us"
            className='rounded-lg w-full max-w-md object-cover'
          />
        </div>

        {/*------ Right Side -------*/}
        <div className='w-full px-4 py-4 text-gray-600 border border-gray-300 rounded-lg'>
          <p className='pb-6'>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className='pb-5'>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <p className='pb-2 text-gray-700 text-base font-semibold'>Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/*------- Choose Us --------*/}
      <div className='mt-14'>
        <p className='text-gray-500 text-xl sm:text-2xl font-semibold mb-6'>
          Why <span className='text-black'>Choose Us</span>
        </p>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='border border-gray-300 rounded-lg p-6 flex-1'>
            <p className='text-gray-900 text-base font-semibold mb-2'>Efficiency:</p>
            <p className='text-gray-600'>
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          <div className='border border-gray-300 rounded-lg p-6 flex-1'>
            <p className='text-gray-900 text-base font-semibold mb-2'>Convenience:</p>
            <p className='text-gray-600'>
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          <div className='border border-gray-300 rounded-lg p-6 flex-1'>
            <p className='text-gray-900 text-base font-semibold mb-2'>Personalization:</p>
            <p className='text-gray-600'>
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
