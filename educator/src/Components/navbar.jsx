import React, { useContext } from 'react';
import Logo from '../Pages/logo.png';
import { AdminContext } from '../Context/adminContext';

const Navbar = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  const {atoken}=useContext(AdminContext);

  return (
    <nav className="bg-cyan-200 px-4 py-3 flex justify-between items-center shadow">
      <img src={Logo} alt="Logo" className="w-28 lg:w-32 cursor-pointer" />
      {!isLoggedIn ? (
        <button
          onClick={onLoginClick}
          className="bg-white text-cyan-500 px-4 py-1 rounded-full font-semibold hover:bg-gray-200"
        >
          Login
        </button>
      ) : (
        <button
          onClick={onLogoutClick}
          className="bg-white text-red-500 px-4 py-1 rounded-full font-semibold hover:bg-gray-200"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
