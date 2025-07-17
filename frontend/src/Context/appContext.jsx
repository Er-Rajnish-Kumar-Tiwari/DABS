import { createContext, useEffect, useState } from "react";
import { doctors, specialityData } from "../assets/assets";
import axios from "axios";

const AppContext = createContext();
const [doctorList, setDoctorList] = useState([]);

const AppContextProvider = (props) => {
  const allDoctors = async () => {
    try {
      const response = await axios.get("https://dabs-backend.onrender.com/doctorList");

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
    allDoctors();
  }, []);

  const value = {
    doctors,
    specialityData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
