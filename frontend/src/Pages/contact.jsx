import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='flex flex-col md:m-7'>
      <p className='text-center text-gray-500 text-xl font-semibold'>CONTACT <span className='text-black'>US</span></p>

      <div className='flex md:flex-row flex-col mt-10 items-center justify-center'>

        {/*----- Left Side ------- */}
        <div className='flex items-center'>
          <img src={assets.contact_image} alt="" className='rounded-lg mb-2 w-80' />
        </div>


        {/*----- Right Side ------ */}
        <div className='flex flex-col md:ml-20'>
          <p className='text-gray-600 font-semibold mb-5'>OUR OFFICE</p>
          <p className='text-gray-500'>841411 Maricha</p>
          <p className='text-gray-500 mb-5'>Saran Bihar</p>
          <p className='text-gray-500 '>Tel: +91-95729-73654</p>
          <p className='text-gray-500 mb-5'>Email: tanish281202@gmail.com</p>
          <p className='text-gray-600 font-semibold mb-5'>CAREERS AT PRESCRIPTO</p>
          <p className='text-gray-500 mb-5'>Learn more about our teams and job openings.</p>
          <button className='border border-gray-800 py-2 rounded-lg'>Explore Jobs</button>
        </div>

      </div>


    </div>
  )
}

export default Contact