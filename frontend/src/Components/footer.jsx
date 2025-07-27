import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaLinkedin ,FaEnvelope} from 'react-icons/fa';

const Footer = () => {
  const navigate=useNavigate();
  return (
    <div className='px-4 sm:px-6 md:px-10'>

      <div className='flex flex-col lg:grid lg:grid-cols-[1.85fr_1fr_1fr] gap-14 my-5 mt-40 text-sm bg-black rounded-lg px-4 py-8 md:p-6'>

        {/* Left Side */}
        <div className='flex flex-col items-center lg:items-start'>
          <img src={assets.logo} alt="Logo" className='mb-5 w-40' />
          <p className='text-gray-100 leading-6 text-center lg:text-left max-w-md'>
            Empowering lives with quality healthcare solutions. At Tanish Health Care, we are committed to delivering trusted medical services, expert consultations, and accessible care for every individual and family. Your health, our priority.
          </p>
        </div>

        {/* Center */}
        <div className='flex flex-col items-center lg:items-start lg:mt-7 md:mt-3 sm:mt-0 mt-0'>
          <p className='font-medium text-xl mb-2 text-blue-600'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-100 text-center lg:text-left items-center'>
            <li onClick={()=>navigate("/")} className='cursor-pointer'>Home</li>
            <li onClick={()=>navigate("/about")} className='cursor-pointer'>About Us</li>
            <li onClick={()=>navigate("/contact")} className='cursor-pointer'>Contact Us</li>
            <li onClick={()=>navigate("/")} className='cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Side */}
        <div className='flex flex-col items-center lg:items-start lg:mt-7 md:mt-3 sm:mt-0 mt-0'>
          <p className='font-medium text-xl mb-2 text-blue-600'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-gray-100 text-center lg:text-left items-center'>
            <li>+91-95729-73654</li>
            <li>tanish281202@gmail.com</li>
            <li className='flex gap-5 mt-2'>
              <a href="https://www.instagram.com/tanish_12_2802/"> <FaInstagram className='text-red-400 text-2xl cursor-pointer'/></a>
              <a href="https://www.linkedin.com/in/rajnish-kumar-tiwari-8661522b0/"> <FaLinkedin className='text-blue-700 text-2xl cursor-pointer'/></a>
              <a href="https://x.com/Tanish281202"> <FaTwitter className='text-blue-500 text-2xl cursor-pointer'/></a>
              <a href="https://mail.google.com/mail/"> <FaEnvelope className='text-red-500 text-2xl cursor-pointer'/></a>
            </li>
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
