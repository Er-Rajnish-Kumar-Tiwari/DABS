import { createContext, useState } from "react";

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dtoken,setDToken]=useState("");

  const value = {dtoken,setDToken};

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );

};

export {DoctorContextProvider,DoctorContext};