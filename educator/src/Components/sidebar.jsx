import React, { useContext } from "react";
import { AdminContext } from "../Context/adminContext";
import { NavLink } from "react-router-dom";
import { MdPersonAdd, MdHome } from "react-icons/md";
import { FaUserMd, FaCalendarCheck } from "react-icons/fa";

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);

  if (!atoken) return null;

  return (
    <>
      {/* Desktop Sidebar (Only visible on lg and above) */}
      <div className="hidden lg:flex flex-col h-screen w-1/5 border-r border-indigo-500 bg-indigo-100">
        <ul className="flex flex-col">
          <SidebarItem to="/dashboard" icon={<MdHome />} label="Dashboard" />
          <SidebarItem to="/appointment" icon={<FaCalendarCheck />} label="Appointments" />
          <SidebarItem to="/add-doctor" icon={<MdPersonAdd />} label="Add Doctor" />
          <SidebarItem to="/doctor-list" icon={<FaUserMd />} label="Doctors List" />
        </ul>
      </div>

      {/* Bottom Navigation (Only visible on mobile and tablet) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-2 z-50 shadow-md">
        <MobileNavItem to="/dashboard" icon={<MdHome size={22} />} />
        <MobileNavItem to="/appointment" icon={<FaCalendarCheck size={22} />} />
        <MobileNavItem to="/add-doctor" icon={<MdPersonAdd size={22} />} />
        <MobileNavItem to="/doctor-list" icon={<FaUserMd size={22} />} />
      </div>
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

export default Sidebar;
