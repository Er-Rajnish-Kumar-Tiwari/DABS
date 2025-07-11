import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='px-4 sm:px-6 md:px-10'>

      <div className='flex flex-col lg:grid lg:grid-cols-[3fr_1fr_1fr] gap-14 my-5 mt-40 text-sm bg-black rounded-lg px-4 py-8 md:p-6'>

        {/* Left Side */}
        <div className='flex flex-col items-center lg:items-start'>
          <img src={assets.logo} alt="Logo" className='mb-5 w-40' />
          <p className='text-gray-100 leading-6 text-center lg:text-left max-w-md'>
            Empowering lives with quality healthcare solutions. At Tanish Health Care, we are committed to delivering trusted medical services, expert consultations, and accessible care for every individual and family. Your health, our priority.
          </p>
        </div>

        {/* Center */}
        <div className='flex flex-col items-center lg:items-start'>
          <p className='font-medium text-xl mb-5 text-white'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-100 text-center lg:text-left'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Side */}
        <div className='flex flex-col items-center lg:items-start'>
          <p className='font-medium text-xl mb-5 text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-100 text-center lg:text-left'>
            <li>+91-95729-73654</li>
            <li>tanish281202@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Copy-Right */}
      <div className='mt-4'>
        <hr className='bg-gray-500 h-0.5' />
        <p className='text-center text-sm text-gray-700 py-2'>
          © 2024 Tanish Health Care — All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;
