import { createContext } from "react";

const AppContext = createContext();

const AppContextProvider = (props) => {

  const value = {};

  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  );

};

export  {AppContextProvider,AppContext};