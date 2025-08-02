import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dtoken, setDToken] = useState("");
  const [appointments, setAppointments] = useState({});
  const [dashBoardData, setDashBoardData] = useState([]);
  const [profileData,setProfileData]=useState([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("dtoken");
    if (savedToken) {
      setDToken(savedToken);
    }
  }, []);

  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "https://dabs-backend.onrender.com/getDoctorAppointment",
        {
          headers: { dtoken: localStorage.getItem("dtoken") },
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

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        "https://dabs-backend.onrender.com/cancelByDoctor",
        { appointmentId },
        { headers: { dtoken } }
      );
      console.log(dtoken);

      if (response.data.Status === "200") {
        toast.success(response.data.Messege);
        getAppointments();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.Messege ||
          "Something went wrong fetching Appointments"
      );
    }
  };

  const markCompleted = async (appointmentId) => {
    try {
      const response = await axios.post(
        "https://dabs-backend.onrender.com/appointmentCompleted",
        { appointmentId },
        { headers: { dtoken } }
      );

      if (response.data.Status === "200") {
        toast.success(response.data.Messege);
        getAppointments();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.Messege ||
          "Something went wrong marking as completed"
      );
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await axios.get(
        "https://dabs-backend.onrender.com/drDashboard",
        { headers: { dtoken } }
      );

      console.log(response.data);

      if (response.data.dashData) {
        setDashBoardData(response.data.dashData);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.Messege ||
          "Something went wrong fetching Appointments"
      );
    }
  };

  const getProfile = async () => {
  try {
    const res = await axios.get(
      "https://dabs-backend.onrender.com/drProfile",
      {
        headers: {
          dtoken
        },
      }
    );
    console.log(res.data);

    if (res.status === 200) {
      setProfileData(res.data.doctorData);
    } else {
      toast.error("Unauthorized or session expired");
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Error fetching profile data"+error.message);
  }
};

  const value = {
    dtoken,
    setDToken,
    getAppointments,
    appointments,
    cancelAppointment,
    markCompleted,
    getDashboardData,
    dashBoardData,
    getProfile,
    profileData,
    setProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export { DoctorContextProvider, DoctorContext };
