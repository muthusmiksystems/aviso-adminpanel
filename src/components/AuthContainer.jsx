import React, { useEffect, useState } from 'react';
import Images from '../assets/images/Image';

const AuthContainer = ({ children }) => {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth >= 1024) {
        setBgImage(`url(${Images.AuthBackground})`);
      } else {
        setBgImage("");
      }
    };
    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground); 
  }, []);
  return (
    <div className="font-[OmnesArabic]">
      <div className="bg-gradient-to-r from-[#B82D97] via-[#57B3D3] to-[#76ABFC] lg:bg-none bg-cover h-auto  pb-16"
        style={{ backgroundImage: bgImage }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
