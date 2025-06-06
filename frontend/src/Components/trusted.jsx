import React from 'react'
import { assets } from '../assets/assets'

const Trusted = () => {
  return (
    <div className='bg-blue-400 flex rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10 md:mx-10 '>

      {/*---- Left Side ----*/}

      <div className='md:w-1/2 flex flex-col items-start  justify-center gap-4 md:gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>

        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl text-white font-semibold'>
          <p>Book Appointment</p>
          <p className='md:mt-4 mt-1'> With 100+ Trusted Doctors</p>
        </div>

        <a href='#special' className='flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-600 m-auto md:m-0 hover:scale-75 transition-all duration-300'>
          Create Account
        </a>

      </div>

      {/*---- Right Side ----*/}

      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img src={assets.appointment_img} alt="" className='w-full absolute bottom-0 max-w-md ' />
      </div>

    </div>
  )
}

export default Trusted