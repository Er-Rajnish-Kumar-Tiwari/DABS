// src/Context/adminContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    const savedToken = localStorage.getItem("atoken");
    if (savedToken) {
      setAToken(savedToken);
    }
  }, []);

  const allDoctors = async () => {
    try {
      const response = await axios.post(
        "https://dabs-backend.onrender.com/allDoctor",
        {}, // empty body
        {
          headers: {
            atoken: atoken,
          },
        }
      );

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

  const changeAvailablity = async (docId) => {
    try {
      const response = await axios.post(
        "https://dabs-backend.onrender.com/availablity",
        { docId },
        { headers: { atoken } }
      );

      if (response.status === 200) {
        toast.success(response.data.Messege);
        allDoctors();
      } else {
        toast.error(response.data.Messege || "Failed to fetch doctors");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.Messege || "Something went wrong fetching doctors"
      );
    }
  };

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "https://dabs-backend.onrender.com/allAppointments",
        {
          headers: { atoken },
        }
      );

      const allAppointments = response.data.appointments;

      // Filter only paid and not cancelled appointments
      const filtered = allAppointments.filter(
        (a) => a.payment === true && a.cancellled !== true
      );

      setAppointments(filtered);
    } catch (error) {
      toast.error(
        error.response?.data?.Messege ||
          "Something went wrong fetching Appointments"
      );
    }
  };

  const cancelAppointment=async(appointmentId)=>{

    try {
      const response=await axios.post("https://dabs-backend.onrender.com/cancelByAdmin",{appointmentId},{headers: { atoken }});
      console.log(response);
      if(response.data.Status==="200"){
        toast.success(response.data.Messege);
        getAppointments();
      }
    } 
    catch (error) {
      toast.error(
        error.response?.data?.Messege ||
        "Something went wrong fetching Appointments"
      );
    }

  };

  const value = {
    atoken,
    setAToken,
    doctorList,
    setDoctorList,
    allDoctors,
    changeAvailablity,
    getAppointments,
    appointments,
    cancelAppointment
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContextProvider, AdminContext };
