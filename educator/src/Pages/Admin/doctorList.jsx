import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorList = () => {
  const { atoken, doctorList, setDoctorList } = useContext(AdminContext);

  const allDoctors = async () => {
    try {
      const response = await axios.get("https://dabs-backend.onrender.com/allDoctor",{});

      console.log("Response:", response);

      if (response.data.Status === "200") {
        setDoctorList(response.data.alldoctors);
      } else {
        toast.error(response.data.Messege || "Failed to fetch doctors");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        error.response?.data?.Messege || "Something went wrong fetching doctors"
      );
    }
  };

  useEffect(() => {
    if (atoken) {
      allDoctors();
    }
  }, [atoken]);

  return (
    <div>
      <h2>Doctor List</h2>
      {doctorList.length === 0 ? (
        <p>No doctors found</p>
      ) : (
        <ul>
          {doctorList.map((doctor) => (
            <li key={doctor._id}>{doctor.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorList;
