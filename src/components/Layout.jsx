import React from "react";
import Sidebar from "./Sidebar";
import {
  FaHome,
  FaEnvelope,
  FaGlobe,
  FaBuilding,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBriefcase,
  FaTags,
  FaNewspaper,
  FaCommentDots,
  FaBell,
  FaIndustry,
  FaGraduationCap,
  FaUniversity,
  FaTools,
} from "react-icons/fa";

const Layout = ({ children }) => {
  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: FaHome }, // Dashboard icon
    { label: "Jobtypes", path: "/jobtypes", icon: FaBriefcase }, // Job-related icon
    { label: "Category", path: "/categories", icon: FaTags }, // Categories icon
    { label: "Enquiries", path: "/enquiries", icon: FaEnvelope }, // Enquiries icon
    { label: "Articles", path: "/articles", icon: FaNewspaper }, // Articles icon
    { label: "Testimonials", path: "/testimonials", icon: FaCommentDots }, // Testimonials icon
    { label: "Subscribe", path: "/subscribe", icon: FaBell }, // Subscribe icon
    { label: "Countries", path: "/countries", icon: FaGlobe }, // Countries icon
    { label: "Industrytype", path: "/industrytype", icon: FaIndustry }, // Industry icon
    { label: "Job", path: "/jobs", icon: FaBriefcase }, // Job icon
    { label: "Education", path: "/education", icon: FaGraduationCap }, // Education icon
    { label: "Institutes", path: "/institutes", icon: FaUniversity }, // Institutes icon
    { label: "Facilities", path: "/facilities", icon: FaTools }, // Facilities icon
    {
      label: "Industry_institute",
      path: "/industry-institute",
      icon: FaBuilding,
    }, // Industry & Institutes icon
    { label: "User", path: "/users", icon: FaUser }, // User icon
    { label: "Settings", path: "/settings", icon: FaCog }, // Settings icon
    { label: "Logout", path: "/logout", icon: FaSignOutAlt }, // Logout icon
  ];

  return (
    <div className="flex font-[omnesarabic]">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} title="Admin Panel" />

      {/* Main Content */}
      <div className="flex-1 ps-14 lg:ps-72 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
