import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='bg-blue-400 flex flex-col md:flex-row rounded-lg px-8 md:px-10 lg:px-20 flex-wrap mt-5'>

      {/*---- Left Side ----*/}
      
      <div className='md:w-1/2 flex flex-col items-start  justify-center gap-4 md:gap-6 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>

        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br/> With Trusted Doctors</p>

        <div className='flex gap-3 flex-col md:flex-row text-white font-light items-center text-sm '>
          <img src={assets.group_profiles} alt="" className='w-28'/>
          <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.</p>
        </div>

        <a href='#special' className='flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-600 m-auto md:m-0 hover:scale-75 transition-all duration-300'>
          Book appointment
          <img src={assets.arrow_icon} alt="" className='w-3'/>
        </a>

      </div>

      {/*---- Right Side ----*/}

      <div className='md:w-1/2 relative'>
        <img src={assets.header_img} alt="" className='w-full md:absolute bottom-0 h-auto rounded-lg'/>
      </div>

    </div>
  )
}

export default Hero