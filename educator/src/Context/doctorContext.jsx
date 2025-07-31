import { createContext, useEffect, useState } from "react";

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dtoken, setDToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("dtoken");
    if (savedToken) {
      setDToken(savedToken);
    }
  }, []);

  const value = { dtoken, setDToken };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export { DoctorContextProvider, DoctorContext };
