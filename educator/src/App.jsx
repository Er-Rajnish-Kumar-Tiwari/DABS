import React, { useContext, useState } from "react";
import LoginPage from "./Pages/login";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { AdminContext } from "./Context/adminContext";
import Navbar from "./Components/navbar";

const App = () => {
  const { setAToken, atoken } = useContext(AdminContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("atoken")
  );
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAToken("");
    localStorage.removeItem("atoken");
    toast.success("Logout Successfully!");
  };

  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginCard(true)}
        onLogoutClick={handleLogout}
      />
      <LoginPage showLoginCard={showLoginCard} setShowLoginCard={setShowLoginCard} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      <footer className="text-cente">
        <hr className="h-0.5 bg-red-400"/>
        <p className="text-sm text-center mb-3 mt-3">© 2025 Tanish All-in-One Health Care. All rights reserved.</p>
        <hr className="h-0.5 bg-red-400"/>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default App;
