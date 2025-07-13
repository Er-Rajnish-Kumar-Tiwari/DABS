import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import {DoctorContextProvider} from "./Context/doctorContext.jsx";
import {AppContextProvider} from "./Context/appContext.jsx";
import { AdminContextProvider } from "./Context/adminContext.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
