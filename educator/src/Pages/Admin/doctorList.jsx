import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorList = () => {
  const { changeAvailablity, doctorList, atoken, allDoctors } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      allDoctors();
    }
  }, [atoken]);

  return (
    <div className="flex flex-col text-red-800 px-4 sm:px-6 md:px-10 mt-5">
      <p className="text-xl sm:text-2xl font-semibold text-start">
        {" "}
        Doctor List{" "}
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 pt-5 px-2 sm:px-0 ">
        {doctorList.map((iteam, index) => (
          <div
            key={index}
            className="border border-blue-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              src={iteam.image}
              alt=""
              className="bg-blue-100 w-full h-50 object-cover"
            />
            <div className="p-3 bg-blue-50">
              <p className="text-gray-900 text-lg font-medium">{iteam.name}</p>
              <p className="text-gray-600 text-sm">{iteam.speciality}</p>

              <div className="flex gap-2  items-center">
                <input
                  type="checkbox"
                  checked={iteam.available}
                  onClick={() => changeAvailablity(iteam._id)}
                />
                <p className="text-green-900 font-semibold">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
