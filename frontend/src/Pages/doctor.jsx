import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/appContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserMd, FaBrain, FaBaby, FaStethoscope } from 'react-icons/fa';
import { MdFemale, MdLocalHospital } from 'react-icons/md';
import { GiStomach } from 'react-icons/gi';
import { BsPersonBoundingBox } from 'react-icons/bs';

const Doctor = () => {
  const { doctorList ,allDoctors} = useContext(AppContext);
  const { speciality } = useParams();
  const [specialityDoctor, setspecialityDoctor] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setspecialityDoctor(doctorList.filter(doc => doc.speciality === speciality))
    } else {
      setspecialityDoctor(doctorList)
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctorList, speciality]);

    useEffect(() => {
    allDoctors();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16">
      <p className='text-gray-700 mt-5 font-semibold text-base sm:text-lg'>
        Browse through the doctors specialist.
      </p>

      <div className='flex flex-col lg:flex-row items-start gap-6 mt-5'>

        {/* Sidebar */}
        <div className='flex flex-row lg:flex-col flex-wrap gap-3 text-sm text-gray-700'>
          <p onClick={() => speciality === "Gynecologist" ? navigate("/doctor") : navigate("/doctor/Gynecologist")}
            className={`w-full sm:w-auto pl-3 py-1.5 flex items-center gap-2 pr-4 border rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            <MdFemale /> Gynecologist
          </p>
          <p onClick={() => speciality === "General physician" ? navigate("/doctor") : navigate("/doctor/General physician")}
            className={`w-full sm:w-auto pl-3 py-1.5 flex items-center gap-2 pr-4 border rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            <FaStethoscope /> General physician
          </p>
          <p onClick={() => speciality === "Dermatologist" ? navigate("/doctor") : navigate("/doctor/Dermatologist")}
            className={`w-full sm:w-auto pl-3 py-1.5 flex items-center gap-2 pr-4 border rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            <BsPersonBoundingBox /> Dermatologist
          </p>
          <p onClick={() => speciality === "Pediatricians" ? navigate("/doctor") : navigate("/doctor/Pediatricians")}
            className={`w-full sm:w-auto pl-3 py-1.5 pr-4 flex items-center gap-2 border rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            <FaBaby /> Pediatricians
          </p>
          <p onClick={() => speciality === "Neurologist" ? navigate("/doctor") : navigate("/doctor/Neurologist")}
            className={`w-full sm:w-auto pl-3 flex items-center gap-2 py-1.5 pr-4 border rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            <FaBrain /> Neurologist
          </p>
          <p onClick={() => speciality === "Gastroenterologist" ? navigate("/doctor") : navigate("/doctor/Gastroenterologist")}
            className={`w-full sm:w-auto pl-3 py-1.5 flex items-center gap-2 pr-4 border rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            <GiStomach /> Gastroenterologist
          </p>
          <p onClick={() => navigate("/doctor")}
            className={`w-full sm:w-auto pl-3 flex items-center gap-2 py-1.5 pr-4 border rounded transition-all cursor-pointer ${!speciality ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            <MdLocalHospital /> All Doctors
          </p>
        </div>

        {/* Doctor Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-5'>
          {specialityDoctor.map((iteam, index) => {
            return (
              <div
                onClick={() => navigate(`/appoimanet/${iteam._id}`)}
                key={index}
                className='border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              >
                <img src={iteam.image} alt="" className='bg-blue-100 w-full h-50 object-cover' />
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
    </div>
  )
}

export default Doctor;
