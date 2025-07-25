import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaHome, FaUserMd, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa'
import { AppContext } from '../Context/appContext'
import { toast } from 'react-toastify'

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate()
  const {token, setToken,profileData} =useContext(AppContext);

  const sumbitBtn = () => {
    setShowLogin(true)
  }

  const logoutHandler=()=>{
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout successfully!");
  }

  return (
    <>
      {/* ---- Top Navbar ---- */}
      <div className='flex items-center justify-between border-b-2 pb-3 bg-sky-200 md:px-20 lg:px-20 px-2 w-full text-sm border-b-gray-400'>

        {/* ---- Logo ---- */}
        <img
          src={assets.logo}
          alt=""
          className="w-28 lg:w-32 cursor-pointer"
          onClick={() => navigate('/')}
        />

        {/* ---- Desktop & Tablet Menu Links ---- */}
        <ul className='items-start md:gap-8 lg:gap-8 gap-3 md:font-medium text-xs hidden sm:flex'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base mt-5 pb-1 border-b-2 transition-all duration-300 ${
                isActive ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-700 hover:border-blue-400'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/doctor"
            className={({ isActive }) =>
              `text-base mt-5 pb-1 border-b-2 transition-all duration-300 ${
                isActive ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-700 hover:border-blue-400'
              }`
            }
          >
            Doctors
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-base mt-5 pb-1 border-b-2 transition-all duration-300 ${
                isActive ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-700 hover:border-blue-400'
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-base mt-5 pb-1 border-b-2 transition-all duration-300 ${
                isActive ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-gray-700 hover:border-blue-400'
              }`
            }
          >
            Contact
          </NavLink>
        </ul>

        {/* ---- Profile or Create ---- */}
        <div className='flex items-center gap-4'>
          {
            token ? (
              <div className='flex items-center gap-2 group relative cursor-pointer mt-5'>
                { profileData && <img src={profileData.image} alt="" className='w-8 rounded-full' /> }
                <img src={assets.dropdown_icon} alt="" className='w-2.5' />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium z-20 text-gray-600 hidden group-hover:block'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p className='cursor-pointer hover:text-black' onClick={() => navigate("/profile")}>My Profile</p>
                    <p className='cursor-pointer hover:text-black' onClick={() => navigate("/myAppoimanet")}>My Appointments</p>
                    <p className='cursor-pointer hover:text-black' onClick={logoutHandler}>Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <button className='text-sm bg-blue-500 px-3 py-2 mt-5 rounded-full text-gray-100 font-semibold' onClick={sumbitBtn}>Create</button>
            )
          }
        </div>
      </div>

      {/* ---- Bottom Icon Navbar (Only Mobile View) ---- */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
        <div className="flex justify-around items-center px-4 py-2 text-blue-700 text-xs">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center transition-all duration-300 ${
                isActive ? 'text-blue-600 border-t-2 border-blue-600 pt-1' : 'text-gray-600'
              }`
            }
          >
            <FaHome size={22} />
          </NavLink>

          <NavLink
            to="/doctor"
            className={({ isActive }) =>
              `flex flex-col items-center transition-all duration-300 ${
                isActive ? 'text-blue-600 border-t-2 border-blue-600 pt-1' : 'text-gray-600'
              }`
            }
          >
            <FaUserMd size={22} />
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex flex-col items-center transition-all duration-300 ${
                isActive ? 'text-blue-600 border-t-2 border-blue-600 pt-1' : 'text-gray-600'
              }`
            }
          >
            <FaInfoCircle size={22} />
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center transition-all duration-300 ${
                isActive ? 'text-blue-600 border-t-2 border-blue-600 pt-1' : 'text-gray-600'
              }`
            }
          >
            <FaPhoneAlt size={22} />
          </NavLink>

        </div>
      </div>
    </>
  )
}

export default Navbar
