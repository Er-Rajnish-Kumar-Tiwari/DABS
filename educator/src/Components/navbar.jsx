import React, { useContext } from 'react';
import Logo from '../Pages/logo.png';
import { AdminContext } from '../Context/adminContext';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  const {atoken}=useContext(AdminContext);
  const navigate=useNavigate();

  return (
    <nav className="bg-cyan-200  py-3 flex justify-between items-center shadow px-5">
      <img src={Logo} onClick={atoken ? ()=>navigate("/dashboard") : ()=>navigate("/") } alt="Logo" className="w-24 lg:w-28 cursor-pointer" />
      {!isLoggedIn ? (
        <button
          onClick={onLoginClick}
          className="bg-white text-cyan-500 px-3 py-0.5 rounded-full font-semibold hover:bg-gray-200 mt-4"
        >
          Login
        </button>
      ) : (
        <button
          onClick={onLogoutClick}
          className="bg-white text-red-500 px-3 py-1 rounded-full font-semibold hover:bg-gray-200 mt-4"
        >
          <MdLogout />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
