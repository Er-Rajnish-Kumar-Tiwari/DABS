import React, { useContext, useState } from "react";
import LoginPage from "./Pages/login";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AdminContext } from "./Context/adminContext";
import Navbar from "./Components/navbar";
import Sidebar from "./Components/sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddDoctor from "./Pages/Admin/addDoctor";
import DoctorList from "./Pages/Admin/doctorList";
import Dashboard from "./Pages/Admin/dashboard";
import Appointment from "./Pages/Admin/appointment";
import { DoctorContext } from "./Context/doctorContext";
import Sidebardr from "./Components/drSidebar";

const App = () => {
  const navigate=useNavigate();
  const { setAToken, atoken } = useContext(AdminContext);
  const {setDToken,dtoken}=useContext(DoctorContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("atoken") || localStorage.getItem("dtoken")
  );
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAToken("");
    setDToken("");
    localStorage.removeItem("atoken");
    localStorage.removeItem("dtoken");
    toast.success("Logout Successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at top */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginCard(true)}
        onLogoutClick={handleLogout}
      />

      {/* Sidebar and Main Content Layout */}
      <div className="flex flex-1">
        {atoken && <Sidebar/>}
        {dtoken && <Sidebardr/>}

        {/* Routed Pages */}
        {atoken && (<div className="flex-1">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointment" element={<Appointment />} />
          </Routes>
        </div>)}
      </div>

      {/* Login Popup */}
      <LoginPage
        showLoginCard={showLoginCard}
        setShowLoginCard={setShowLoginCard}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Footer */}
      <footer className="text-center">
        <hr className="h-0.5 bg-red-400" />
        <p className="text-sm text-center mb-3 mt-3">
          © 2025 Tanish All-in-One Health Care. All rights reserved.
        </p>
        <hr className="h-0.5 bg-red-400" />
      </footer>

      <ToastContainer />
    </div>
  );
};

export default App;
