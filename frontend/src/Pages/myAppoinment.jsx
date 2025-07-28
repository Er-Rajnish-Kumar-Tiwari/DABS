import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/appContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppoinment = () => {

  const { token } = useContext(AppContext);
  const [appointments,setAppointments]=useState([]);

  const allApointments=async()=>{
    const response=await axios.get("https://dabs-backend.onrender.com/listAppointments",{headers:{Authorization: `Bearer ${token}`}});
    if(response.data){
      setAppointments(response.data.appointments.reverse());
    }
  };

  const cancelAppointment=async(appointmentId)=>{

    try {
      const response=await axios.post("https://dabs-backend.onrender.com/canelAppointment",{appointmentId},{headers:{Authorization: `Bearer ${token}`}});
      toast.success(response.data.Messege);
      allApointments();
      console.log(response.data);
    } 
    catch (error) {
      console.log(error.message);
      toast.error(error.message);  
    }

  };

  const initPay=(order)=>{

    const options={
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Tanish All In One Health Care",
        description: "Book Appointment",
        order_id: order.id,
        receipt:order.receipt,
        handler: async (response)=>{
          try {
            const validationResponse = await axios.post(
              "https://dabs-backend.onrender.com/validate",
              {
                razorpay_order_id: response.razorpay_order_id,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                },
              }
            );
  
            if (validationResponse.data.Status === "200") {
              toast.success("Payment successful!");
              allApointments();
            } else {
              toast.error("Payment validation failed.");
            }
          } catch (error) {
          }
        }
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
      toast.success("Payment successful!");
  };

  const paymentRazorpay=async(appointmentId)=>{

    try {
      const response=await axios.post("https://dabs-backend.onrender.com/payment",{appointmentId},{headers:{Authorization: `Bearer ${token}`}});
      
      if(response.data){
        initPay(response.data.order);
      }
    } 
    catch (error) {
      console.log(error.message);
      toast.error(error.message);  
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

                  { !iteam.cancellled && iteam.payment && <button className='px-8 py-2 border  border-gray-300 rounded-md bg-blue-700 outline-none text-white'>Paid</button>}
                  { !iteam.cancellled && !iteam.payment && <button className='px-4 py-2 border  border-gray-300 rounded-md bg-blue-300 outline-none hover:bg-indigo-400 hover:scale-110 transition-all' onClick={()=>paymentRazorpay(iteam._id)}>Pay Here</button>}
                  { !iteam.cancellled && !iteam.payment && <button className='px-8 py-2 border  border-gray-300 rounded-md outline-none bg-red-200 hover:bg-red-400 hover:scale-110 transition-all' onClick={()=>cancelAppointment(iteam._id)}>Cancel</button>}
                  {iteam.cancellled && <button className='px-8 py-2 border-red-700 bg-red-700 text-white rounded'>Cancelled</button>}
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