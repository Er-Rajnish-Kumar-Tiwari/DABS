import { createContext, useEffect, useState } from "react";
import { specialityData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctorList, setDoctorList] = useState([]);
  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState(false);

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
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://dabs-backend.onrender.com/getProfileData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.Status === "200") {
        setUser(res.data.userData);
      } else {
        toast.error("Unauthorized or session expired");
      }
    } catch (error) {
      toast.error("Error fetching profile data");
      console.error("Profile Fetch Error:", error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    } else {
      setProfileData(false);
    }
  }, [token]);

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
