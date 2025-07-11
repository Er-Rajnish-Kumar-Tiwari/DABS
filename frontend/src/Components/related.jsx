import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/appContext';
import { useNavigate } from 'react-router-dom';

const Related = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const docData = doctors.filter(doc => doc.speciality === speciality && doc._id !== docId);
      setRelDoc(docData);
    }
  }, [speciality, docId, doctors]);

  return (
    <div className='flex flex-col items-center gap-4 text-gray-800 px-4 sm:px-6 md:px-10 lg:px-16 mt-10 md:mt-20'>

      <p className='text-2xl sm:text-3xl font-medium text-center'>Related Doctors</p>
      <p className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center text-sm sm:text-base'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-5 px-2 sm:px-0'>
        {relDoc.map((iteam, index) => (
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
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{iteam.name}</p>
              <p className='text-gray-600 text-sm'>{iteam.speciality}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Related;
