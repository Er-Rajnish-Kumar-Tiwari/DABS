// src/Context/adminContext.jsx
import { createContext, useEffect, useState } from "react";

const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("atoken");
    if (savedToken) {
      setAToken(savedToken);
      console.log("Token restored from localStorage:", savedToken);
    }
  }, []);

  const value = { atoken, setAToken };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export { AdminContextProvider, AdminContext };
