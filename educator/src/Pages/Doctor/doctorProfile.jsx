import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../Context/doctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { profileData, dtoken, getProfile ,setProfileData} = useContext(DoctorContext);
  const [isEdit,setIsEdit]=useState(false);

  useEffect(() => {
    if (dtoken) {
      getProfile();
    }
  }, [dtoken]);

  const { image, name, speciality, degree, experience, fees, about, address ,avaiable} = profileData;

  const updatePofile=async()=>{

    try {
      const updateData={
        address:address,
        fees:fees,
        avaiable:avaiable
      };

      const response=await axios.post("https://dabs-backend.onrender.com/updateProfile",updateData,{headers:{dtoken}});
      if(response.data.Status=="200"){
        toast.success(response.data.Messege);
        setIsEdit(false);
        getProfile();
      }
    } 
    catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* Right: Info */}
        <div className="flex-1 border border-stone-300 rounded-xl p-5 sm:p-8 bg-gray-200 shadow-sm " >
          <img
            src={image}
            alt="Doctor"
            className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-lg shadow-md mb-2 bg-blue-400"
          />
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {name}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-700 text-sm sm:text-base">
            <p>
              {degree} - {speciality}
            </p>
            <span className="px-2 py-0.5 border border-gray-400 text-xs rounded-full">
              {experience}
            </span>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-gray-900">About:</p>
            <p className="text-sm text-gray-700 mt-1 leading-relaxed">
              {about}
            </p>
          </div>

          <p className="mt-4 text-sm sm:text-base font-medium text-gray-700">
            Appointment Fees:{" "}
            <span className="text-gray-900 font-semibold">Rs. {isEdit ? <input type="number" onChange={(e)=>setProfileData(pre=>({...pre,fees:e.target.value}))} value={fees} className="px-2 py-1 rounded-lg outline-blue-500 border-none"/>  : fees}</span>
          </p>

          <div className="mt-3">
            <p className="text-sm font-medium text-gray-800">Address:</p>
            <p className="text-sm text-gray-700">
              {isEdit ? <input type="text" onChange={(e)=>setProfileData(pre=>({...pre,address:{...pre.address,line1:e.target.value}}))} value={address?.line1}  className="px-2 py-1 rounded-lg outline-blue-500 border-none"/>  : address?.line1}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
            <input type="checkbox" id="available" className="w-4 h-4" checked={avaiable} onChange={()=>isEdit && setProfileData(pre=>({...pre,avaiable:!pre.avaiable}))}/>
            <label htmlFor="available">Available</label>
          </div>

          { !isEdit
            ? <button className="mt-5 bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-2 rounded-full text-sm shadow" onClick={()=>setIsEdit(true)}>Edit</button>
            : <button className="mt-5 bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-2 rounded-full text-sm shadow" onClick={updatePofile}>Save</button>
          }

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
