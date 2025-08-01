import axios from "axios";
import { createContext, useEffect, useState } from "react";

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dtoken, setDToken] = useState("");
  const [appointments, setAppointments] = useState({});

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

        console.log(response.data);
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
      const response=await axios.post("https://dabs-backend.onrender.com/cancelByDoctor",{appointmentId},{headers: { dtoken }});
      console.log(dtoken);

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

  const value = { dtoken, setDToken ,getAppointments, appointments ,cancelAppointment};

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export { DoctorContextProvider, DoctorContext };
