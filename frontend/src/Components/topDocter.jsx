import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/appContext';

const TopDocter = () => {

  const navigate=useNavigate();
  const {doctors}=useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 text-gray-800 md:mx-10'>

      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-5 px-3 sm-px-0'>
        {doctors.slice(0, 12).map((iteam, index) => {
          return (
            <div onClick={()=>navigate(`/appoimanet/${iteam._id}`)} key={index} className='border border-blue-400  rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img src={iteam.image} alt="" className='bg-blue-100' />
              <div className='p-4 bg-blue-50'>

                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <div className='bg-green-500 h-2 w-2 rounded-full'></div>
                  <p>Available</p>
                </div>

                <p className='text-gray-900 text-lg font-medium'>{iteam.name}</p>
                <p className='text-gray-600 text-sm'>{iteam.speciality}</p>
              </div>
            </div>
          )
        })}
      </div>

      <button className='bg-blue-200 rounded-full py-2 px-12 mt-10' onClick={()=>{navigate("/doctor"); scrollTo(0,0)}}>More</button>

    </div>
  )
}

export default TopDocter