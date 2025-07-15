import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Navbar from "../Components/navbar";
import { AdminContext } from "../Context/adminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = ({
  setShowLoginCard,
  showLoginCard,
  setIsLoggedIn,
  isLoggedIn,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("Admin");
  const navigate=useNavigate();

  const { setAToken, atoken } = useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      setIsLoggedIn(true);
    }
  }, [atoken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const route = state === "Admin" ? "/adminLogin" : "/doctorLogin";
      const response = await axios.post(
        `https://dabs-backend.onrender.com${route}`,
        { email, password }
      );

      if (response.data.Messege === "Admin Login Successfully") {
        setAToken(response.data.token);
        localStorage.setItem("atoken", response.data.token);
        setIsLoggedIn(true);
        setShowLoginCard(false);
        setEmail("");
        setPassword("");
        navigate("/dashboard");
        toast.success(response.data.Messege);
      } else if (response.data.Messege === "Wrong admin details") {
        toast.error(response.data.Messege + " Try again!");
        setEmail("");
        setPassword("");
      } else {
        toast.warning("Something went wrong with the network!");
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error("Login failed. Please check your details or try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
      {showLoginCard && !isLoggedIn && (
        <div className="max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 relative">
          <button
            onClick={() => setShowLoginCard(false)}
            className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>

          <h2 className="text-xl font-bold text-center mb-4 text-orange-800">
            <span className="text-blue-500">
              {state} Login in Tanish All In <br />
              <span className="text-gray-500">One Health Care</span>
            </span>
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black font-semibold"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black font-semibold"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded mb-3"
          >
            Login
          </button>

          {state === "Admin" ? (
            <p className="text-gray-700 font-semibold">
              Doctor Login{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p className="text-gray-700 font-semibold">
              Admin Login{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
