import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = ({ menuItems, title }) => {
  const [openSections, setOpenSections] = useState({});

  // Toggle collapsible sections
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="h-screen w-64 bg-[#1E293B] text-white flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* Top-level menu item */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg hover:bg-[#334155] transition cursor-pointer ${
                item.subMenu ? "" : "space-x-3"
              }`}
              onClick={() => item.subMenu && toggleSection(item.label)}
            >
              <div className="flex items-center space-x-3">
                {item.icon && <item.icon className="text-xl" />}
                <span>{item.label}</span>
              </div>
              {item.subMenu &&
                (openSections[item.label] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                ))}
            </div>

            {/* Submenu items */}
            {item.subMenu && openSections[item.label] && (
              <div className="ml-6 mt-2 space-y-2">
                {item.subMenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="block p-2 rounded-lg hover:bg-[#334155] transition"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
