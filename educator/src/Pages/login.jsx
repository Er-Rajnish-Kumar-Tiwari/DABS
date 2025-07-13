import React, { useContext, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Navbar from '../Components/navbar';
import { AdminContext } from '../Context/adminContext';
import axios from 'axios';

const LoginPage = () => {
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state,setState]=useState("Admin");
  const {setAToken,atoken,backendUrl}=useContext(AdminContext);

  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      
      if(state==="Admin"){

        const {data}=await axios.post(backendUrl+'/adminLogin',{email,password});
        if(data){
          console.log(data);
        }
      }
      else{

      }

    } 
    catch (error) {
      
    }

  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginCard(true)}
        onLogoutClick={handleLogout}
      />

      {/* Login Card */}
      {showLoginCard && !isLoggedIn && (
        <div className="max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 relative">

          <button
            onClick={() => setShowLoginCard(false)}
            className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>

          <h2 className="text-xl font-bold text-center mb-4 text-orange-800 ">
            <span className='text-blue-500'>{state} Login in Tanish All In <br /> <span className='text-gray-500'>One Health Care</span></span>
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

          {
            state==="Admin"
            ? <p className='text-gray-700 font-semibold'>Doctor Login <span className='text-blue-600 cursor-pointer underline' onClick={()=>setState("Doctor")}>Click here</span></p>
            : <p className='text-gray-700 font-semibold'>Admin Login <span className='text-blue-600 cursor-pointer underline' onClick={()=>setState("Admin")}>Click here</span></p>
          }

        </div>
      )}
    </div>
  );
};

export default LoginPage;