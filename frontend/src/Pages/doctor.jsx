import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/appContext'
import { useNavigate, useParams } from 'react-router-dom';

const Doctor = () => {

  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const [specialityDoctor, setspecialityDoctor] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setspecialityDoctor(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setspecialityDoctor(doctors)
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-700 mt-5 font-semibold'>Browse through the doctors specialist.</p>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        <div className='flex flex-col gap-4 text-sm text-gray-700'>
          <p onClick={() => speciality === "Gynecologist" ? navigate("/doctor") : navigate("/doctor/Gynecologist")}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            Gynecologist
          </p>
          <p onClick={() => speciality === "General physician" ? navigate("/doctor") : navigate("/doctor/General physician")}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            General physician
          </p>
          <p onClick={() => speciality === "Dermatologist" ? navigate("/doctor") : navigate("/doctor/Dermatologist")}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            Dermatologist
          </p>
          <p onClick={() => speciality === "Pediatricians" ? navigate("/doctor") : navigate("/doctor/Pediatricians")}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            Pediatricians
          </p>
          <p onClick={() => speciality === "Neurologist" ? navigate("/doctor") : navigate("/doctor/Neurologist")}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            Neurologist
          </p>
          <p onClick={() => speciality === "Gastroenterologist" ? navigate("/doctor") : navigate("/doctor/Gastroenterologist")}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            Gastroenterologist
          </p>
          <p onClick={() => navigate("/doctor")}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded transition-all cursor-pointer ${!speciality ? "bg-indigo-100 text-black border-blue-500 shadow-lg" : "border-gray-400"}`}>
            All Doctors
          </p>
        </div>

        <div className='w-full grid md:grid-cols-5 grid-cols-auto gap-4 pt-5 gap-y-5 px-3 sm:px-0'>
          {specialityDoctor.map((iteam, index) => {
            return (
              <div onClick={() => navigate(`/appoimanet/${iteam._id}`)} key={index} className='border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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
    </div>
  )
}

export default Doctor;
