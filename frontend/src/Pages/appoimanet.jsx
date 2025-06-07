import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Context/appContext';
import { assets } from '../assets/assets';
import Related from '../Components/related';

const Appoimanet = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot,setDocSlot]=useState([]);
  const [timeSlot,setTimeSlot]=useState('');
  const [indexSlot,setIndexSlot]=useState(0);
  const dayOfWeek=["MON","TUE","WED","THU","FRI","SAT","SUN"];

  const fetchInfo = () => {
    const info = doctors.find(doc => doc._id === docId);
    setDocInfo(info);
  };

  useEffect(() => {
    fetchInfo();
  }, [doctors, docId]);


  const getAvailbleSlot=()=>{

    setDocSlot([]);

    const today=new Date();

    for(let i=0; i<7; i++){

      const currentData=new Date(today);
      currentData.setDate(today.getDate()+i);

      const endTime=new Date();
      endTime.setDate(today.getDate()+i);
      endTime.setHours(20,0,0,0);

      if(today.getDate()===currentData.getDate()){
        currentData.setHours(currentData.getHours() > 10 ? currentData.getHours()+1 : 10);
        currentData.setMinutes(currentData.getMinutes() > 30 ? 30 : 0)
      }
      else{
        currentData.setHours(8);
        currentData.setMinutes(0);
      }

      let slotTime=[];
      while(currentData < endTime){

        const formattedTime=currentData.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",hour12:true});
        slotTime.push({
          dateTime:new Date(currentData),
          time:formattedTime
        });

        currentData.setMinutes(currentData.getMinutes()+30);
      }
        setDocSlot(pre=>([...pre,slotTime]));

    }

  };

  useEffect(()=>{
    getAvailbleSlot();
  },[docInfo]);

  useEffect(()=>{
    console.log(docSlot);
  },[docSlot])


  return docInfo && (
    <div className='mt-5 md:mx-10'>

      <div className='flex flex-col sm:flex-row gap-4'>

        {/*----- Doctor Details -----*/}

        <div className='w-full sm:w-72'>
          <img
            src={docInfo.image}
            alt=""
            className='bg-blue-400 w-full h-auto rounded-lg object-cover'
          />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-6 sm:p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img src={assets.verified_icon} alt="" className='w-5' />
          </p>

          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600 flex-wrap'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>
              {docInfo.experience}
            </button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>

          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee:
            <span className='text-gray-700'> Rs.{docInfo.fees * 30}</span>
          </p>
        </div>

      </div>


      {/*------- Booking Slots --------- */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-800'>
        <p className='text-2xl'>Booking Slots</p>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot.map((iteam,index)=>{
            return(
              <div key={index} onClick={()=>setIndexSlot(index)} className={` text-center py-6 min-w-16 rounded-full outline-none cursor-pointer ${indexSlot===index ? "bg-blue-500 shadow-lg text-white" : "border border-gray-400"}`}>
                <p>{iteam[0]&& dayOfWeek[iteam[0].dateTime.getDay()]}</p>
                <p>{iteam[0] && iteam[0].dateTime.getDate()}</p>
              </div>
            )
          })}
        </div>

        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot[indexSlot].map((iteam,index)=>{
            return(
              <div key={index} onClick={()=>setTimeSlot(iteam.time)} className={` text-gray-500 text-center py-1 min-w-24 rounded-full cursor-pointer outline-none ${iteam.time===timeSlot ? "bg-blue-500 shadow-lg text-white" : "border border-indigo-300"}`}>
                <p>{iteam.time.toLowerCase()}</p>
              </div>
            )
          })}
        </div>

        <button className='bg-blue-500 px-8 py-3 text-gray-950 mt-10 rounded-full font-semibold hover:bg-blue-700'>Book An Appointment</button>

      </div>

      <Related docId={docId} speciality={docInfo.speciality}/>

    </div>
  );
};

export default Appoimanet;
