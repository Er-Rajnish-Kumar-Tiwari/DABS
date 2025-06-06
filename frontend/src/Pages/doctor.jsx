import React, { useContext } from 'react'
import { AppContext } from '../Context/appContext'

const Doctor = () => {

  const {doctors}=useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 text-gray-800 md:mx-10'>

      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-5 px-3 sm-px-0'>
        {doctors.map((iteam, index) => {
          return (
            <div onClick={() => navigate(`/appoimanet/${iteam._id}`)} key={index} className='border border-blue-400  rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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

    </div>
  )
}

export default Doctor