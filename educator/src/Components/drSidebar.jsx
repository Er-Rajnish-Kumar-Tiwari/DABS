import React, { useContext } from "react";
import { AdminContext } from "../Context/adminContext";
import { DoctorContext } from "../Context/doctorContext";
import { NavLink } from "react-router-dom";
import { MdPersonAdd, MdHome } from "react-icons/md";
import { FaUserMd, FaCalendarCheck } from "react-icons/fa";

const Sidebardr = () => {
  const { dtoken } = useContext(DoctorContext);

  if ( !dtoken) return null;

  return (
    <>
      {dtoken && (
        <>
          {/* Doctor Sidebar - Desktop */}
          <div className="hidden lg:flex flex-col h-screen w-1/5 border-r border-indigo-500 bg-indigo-100">
            <ul className="flex flex-col">
              <SidebarItem to="/doctor-dashboard" icon={<MdHome />} label="Dashboard" />
              <SidebarItem to="/doctor-appointments" icon={<FaCalendarCheck />} label="Appointments" />
              <SidebarItem to="/doctor-profile" icon={<FaUserMd />} label="Profile" />
            </ul>
          </div>

          {/* Doctor Bottom Nav - Mobile/Tablet */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-2 z-50 shadow-md">
            <MobileNavItem to="/doctor-dashboard" icon={<MdHome size={22} />} />
            <MobileNavItem to="/doctor-appointments" icon={<FaCalendarCheck size={22} />} />
            <MobileNavItem to="/doctor-profile" icon={<FaUserMd size={22} />} />
          </div>
        </>
      )}
    </>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex gap-2 items-center text-gray-700 font-medium border-b border-gray-900 pb-4 ${
        isActive ? "bg-indigo-300 text-gray-900 border-r-4 border-blue-950" : ""
      }`
    }
  >
    <span className="ml-6 mt-5">{icon}</span>
    <p className="mt-5">{label}</p>
  </NavLink>
);

const MobileNavItem = ({ to, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center text-sm ${
        isActive ? "text-indigo-700" : "text-gray-500"
      }`
    }
  >
    {icon}
  </NavLink>
);

export default Sidebardr;
