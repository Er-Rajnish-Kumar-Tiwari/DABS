// src/Context/adminContext.jsx
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState("");
  const [doctorList, setDoctorList] = useState([]);

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

  const changeAvailablity=async(docId)=>{

    try {
      const response=await axios.post("https://dabs-backend.onrender.com/availablity",{docId},{headers:{atoken}});

      if(response.status===200){
        toast.success(response.data.Messege);
        allDoctors();
      } else {
        toast.error(response.data.Messege || "Failed to fetch doctors");
      }
    }

    catch (error) {
      toast.error(error.response?.data?.Messege || "Something went wrong fetching doctors");
    }

  };

  const value = { atoken, setAToken, doctorList, setDoctorList, allDoctors ,changeAvailablity};

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContextProvider, AdminContext };
