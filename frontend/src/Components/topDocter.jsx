import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/appContext';

const TopDocter = () => {
  const navigate = useNavigate();
  const { doctorList } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 text-gray-800 px-4 sm:px-6 md:px-10 lg:px-16'>

      <h1 className='text-2xl sm:text-3xl font-medium text-center'>Top Doctors to Book</h1>
      <p className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center text-sm sm:text-base'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-5 px-2 sm:px-0'>
        {doctorList.slice(0, 10).map((iteam, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/appoimanet/${iteam._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className='border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            >
              <img src={iteam.image} alt="" className='bg-blue-100 w-full h-50 object-cover' />
              <div className='p-3 bg-blue-50'>
                <div className='flex items-center gap-2 text-sm text-green-500'>
                  <div className='bg-green-500 h-2 w-2 rounded-full'></div>
                  <p>{iteam.avaiable ? "Available" : " Not Available"}</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{iteam.name}</p>
                <p className='text-gray-600 text-sm'>{iteam.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className='bg-blue-200 rounded-full py-2 px-10 sm:px-12 mt-10 text-sm sm:text-base'
        onClick={() => {
          navigate("/doctor");
          scrollTo(0, 0);
        }}
      >
        More
      </button>
    </div>
  );
};

export default TopDocter;
