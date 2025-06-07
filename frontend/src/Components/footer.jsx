import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (

    <div className='md:mx-10'>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-5 mt-40  text-sm bg-black md:p-5 px-2 rounded-lg pb-3'>

        {/*----- Left Side ----- */}
        <div>
          <img src={assets.logo} alt="" className='mb-5 w-40 ml-20' />
          <p className='w-full md:w-2/3 text-gray-100 leading-6 md:text-left text-center'>Empowering lives with quality healthcare solutions. At Tanish Health Care, we are committed to delivering trusted medical services, expert consultations, and accessible care for every individual and family. Your health, our priority.</p>
        </div>


        {/*----- Center ----- */}
        <div>
          <p className='font-medium text-xl mb-5 text-white md:mt-8 md:text-left text-center'>COMPANY</p>

          <ul className='flex flex-col gap-2 text-gray-100 md:text-left  text-center pl-5'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>

        </div>


        {/*----- Right Side ----- */}
        <div>
          <p className='font-medium text-xl mb-5 text-white md:mt-8 md:text-left text-center'>GET IN TOUCH</p>

          <ul className='flex flex-col gap-2 text-gray-100 md:text-left text-center  '>
            <li>+91-95729-73654</li>
            <li>tanish281202@gmail.com</li>
          </ul>

        </div>

      </div>

      {/* ----- Copy-Right -----*/}
      <div>
        <hr className='bg-gray-500 h-0.5'/>
        <p className='text-center pb-2'>Copyright © 2024 Tanish Health Care - All Right Reserved.</p>
      </div>

    </div>

  )
}

export default Footer