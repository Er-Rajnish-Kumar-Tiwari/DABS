import { createContext, useState } from "react";

const AdminContext=createContext();

const AdminContextProvider=(props)=>{

    const [atoken,setAToken]=useState("");
    const backendUrl=import.meta.env.Backend_URL;

    const value={atoken,setAToken,backendUrl};

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );

};

export  {AdminContextProvider,AdminContext};