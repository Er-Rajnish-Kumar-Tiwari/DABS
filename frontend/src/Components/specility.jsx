import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context/appContext'

const Specility = () => {

  const {specialityData}=useContext(AppContext);
  
  return (
    <div id='special' className='flex flex-col items-center gap-4 text-gray-800 py-8'>

      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>

      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
        {specialityData.map((iteam,index)=>{
          return(
            <Link onClick={()=>scrollTo(0,0)} to={`/doctor/${iteam.speciality}`} key={index} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
              <img src={iteam.image} alt="" className='w-16 sm:w-24 mb-2' />
              <p>{iteam.speciality}</p>
            </Link>
          )
        })}
      </div>

    </div>
  )
}

export default Specility