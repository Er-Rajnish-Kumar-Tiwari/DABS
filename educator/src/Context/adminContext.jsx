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
  
  const value = { atoken, setAToken, doctorList ,setDoctorList};

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContextProvider, AdminContext };
