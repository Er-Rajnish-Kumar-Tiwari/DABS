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
      <ToastContainer />
    </div>
  );
};

export default App;
