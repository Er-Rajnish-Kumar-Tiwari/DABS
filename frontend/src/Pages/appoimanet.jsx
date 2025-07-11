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
  const [docSlot, setDocSlot] = useState([]);
  const [timeSlot, setTimeSlot] = useState('');
  const [indexSlot, setIndexSlot] = useState(0);
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const fetchInfo = () => {
    const info = doctors.find(doc => doc._id === docId);
    setDocInfo(info);
  };

  useEffect(() => {
    fetchInfo();
  }, [doctors, docId]);

  const getAvailbleSlot = () => {
    setDocSlot([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentData = new Date(today);
      currentData.setDate(today.getDate() + i);

      const endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(20, 0, 0, 0);

      if (today.getDate() === currentData.getDate()) {
        currentData.setHours(currentData.getHours() > 10 ? currentData.getHours() + 1 : 10);
        currentData.setMinutes(currentData.getMinutes() > 30 ? 30 : 0);
      } else {
        currentData.setHours(8);
        currentData.setMinutes(0);
      }

      let slotTime = [];
      while (currentData < endTime) {
        const formattedTime = currentData.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        slotTime.push({
          dateTime: new Date(currentData),
          time: formattedTime
        });

        currentData.setMinutes(currentData.getMinutes() + 30);
      }

      setDocSlot(prev => [...prev, slotTime]);
    }
  };

  useEffect(() => {
    if (docInfo) getAvailbleSlot();
  }, [docInfo]);

  return (
    docInfo && (
      <div className='mt-5 px-4 sm:px-6 md:px-10'>

        {/* Doctor Section */}
        <div className='flex flex-col sm:flex-row gap-5'>

          {/* Image */}
          <div className='w-full sm:w-72'>
            <img
              src={docInfo.image}
              alt=""
              className='bg-blue-400 w-full h-auto rounded-lg object-cover'
            />
          </div>

          {/* Info */}
          <div className='flex-1 border border-gray-400 rounded-lg p-5 sm:p-6 bg-white'>
            <p className='flex items-center gap-2 text-2xl font-semibold text-gray-900'>
              {docInfo.name}
              <img src={assets.verified_icon} alt="Verified" className='w-5' />
            </p>

            <div className='flex flex-wrap items-center gap-2 text-sm mt-1 text-gray-600'>
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className='py-0.5 px-2 border text-xs rounded-full'>
                {docInfo.experience}
              </button>
            </div>

            <div className='mt-3'>
              <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className='text-sm text-gray-500 mt-1'>
                {docInfo.about}
              </p>
            </div>

            <p className='text-gray-500 font-medium mt-4'>
              Appointment fee:
              <span className='text-gray-700'> Rs.{docInfo.fees * 30}</span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className='mt-8'>
          <p className='text-xl sm:text-2xl font-semibold text-gray-800'>Booking Slots</p>

          {/* Days */}
          <div className='flex gap-3 items-center overflow-x-auto mt-4 pb-1'>
            {docSlot.length > 0 &&
              docSlot.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setIndexSlot(index)}
                  className={`text-center py-6 px-4 min-w-16 rounded-full cursor-pointer text-sm ${
                    indexSlot === index
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'border border-gray-400 text-gray-700'
                  }`}
                >
                  <p>{item[0] && dayOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className='flex gap-3 items-center overflow-x-auto mt-4 pb-1'>
            {docSlot.length > 0 &&
              docSlot[indexSlot].map((item, index) => (
                <div
                  key={index}
                  onClick={() => setTimeSlot(item.time)}
                  className={`text-center py-1 px-4 min-w-24 rounded-full text-sm cursor-pointer ${
                    item.time === timeSlot
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'border border-indigo-300 text-gray-500'
                  }`}
                >
                  <p>{item.time.toLowerCase()}</p>
                </div>
              ))}
          </div>

          <button className='bg-blue-500 px-6 py-2.5 text-white mt-8 rounded-full font-semibold hover:bg-blue-600 transition-all'>
            Book An Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <Related docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appoimanet;
