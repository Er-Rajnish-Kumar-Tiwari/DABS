import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/appContext'
import axios from 'axios';

const MyAppoinment = () => {

  const { token } = useContext(AppContext);
  const [appointments,setAppointments]=useState([]);

  const allApointments=async()=>{
    const response=await axios.get("https://dabs-backend.onrender.com/listAppointments",{headers:{Authorization: `Bearer ${token}`}});
    console.log(response.data);
    if(response.data){
      setAppointments(response.data.appointments.reverse());
    }
  };

  useEffect(()=>{
    if(token){
      allApointments();
    }
  },[token]);

  return appointments && (
    <div className='mt-10 md:ml-10'>

      <p className='mb-5 text-2xl text-gray-500 font-semibold'>My appointments</p>

      <div>
        {appointments.map((iteam, index) => {
          return (

            <div className='flex flex-row  border border-y-gray-400' key={index}>

              <img src={iteam.docData.image} alt="" className='w-40 bg-indigo-200 my-5  rounded-md hidden md:block lg:block' />

              <div className='w-full flex justify-between'>

                <div className='my-3 md:ml-8 ml-3'>

                  <p className='text-xl text-gray-900 font-medium'>{iteam.docData.name}</p>
                  <p className='text-gray-600'>{iteam.docData.speciality}</p>
                  <p className='text-gray-600 font-semibold mt-2'>Address : </p>
                  <p className='text-gray-600'>{iteam.docData.address.line1}</p>
                  <p className='text-gray-600 font-semibold mt-2'>Date & Time : <p className='text-gray-600 font-normal'> {iteam.slotDate} |  {iteam.slotTime}</p> </p>

                </div>

                <div className='flex flex-col gap-3 mb-3 mr-3 justify-end'>

                  <button className='px-4 py-2 border  border-gray-300 rounded-md bg-blue-300 outline-none hover:bg-indigo-400 hover:scale-110 transition-all'>Pay Here</button>
                  <button className='px-8 py-2 border  border-gray-300 rounded-md outline-none bg-red-200 hover:bg-red-400 hover:scale-110 transition-all'>Cancel</button>
                </div>

              </div>

            </div>

          )
        })}
      </div>

    </div>
  )
}

export default MyAppoinment