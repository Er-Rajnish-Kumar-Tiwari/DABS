import { createContext, useEffect, useState } from "react";
import { specialityData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctorList, setDoctorList] = useState([]);
  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const allDoctors = async () => {
    try {
      const response = await axios.get(
        "https://dabs-backend.onrender.com/doctorList"
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
    allDoctors();
  }, []);

const getProfile = async () => {
  try {
    const t=localStorage.getItem("token");
    console.log(t);
    const res = await axios.get(
      "https://dabs-backend.onrender.com/getProfileData",
      {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      }
    );

    if (res.status === 200) {
      setProfileData(res.data.userData);
    } else {
      toast.error("Unauthorized or session expired");
    }
  } catch (error) {
    toast.error("Error fetching profile data"+error.message);
    console.log(localStorage.getItem("token"));
  }
};


  useEffect(() => {
      getProfile();
  }, []);

  const value = {
    doctorList,
    setDoctorList,
    allDoctors,
    specialityData,
    token,
    setToken,
    profileData,
    setProfileData,
    getProfile,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
