import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/features/authSlice";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ menuItems, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar Toggle Button for Small Screens */}
      <button
        className="lg:hidden p-4 text-white bg-[#1E293B] fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1E293B] font-[omnesarabic] text-white z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 w-64 overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-6 text-center border-b border-gray-700">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        {/* Menu Items */}
        <ul className="flex-1 p-4 space-y-4">
          {menuItems.map((item, index) => (
            <li key={index} className="p-4 hover:bg-gray-700">
              {item.label === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left bg-transparent border-none cursor-pointer text-white hover:text-gray-300"
                >
                  <item.icon className="text-xl" />
                  {item.label}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center gap-2 w-full text-left hover:text-gray-300"
                >
                  <item.icon className="text-xl" />
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          className="fixed inset-0  z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
