import React from "react";
export default function DHSplashScreen({logoImage, className}) {
  return (
    <div className={`w-1/2 div-with-bg min-h-full bg-no-repeat bg-cover bg-center rounded-2xl mr-2 ${className}`}>
      <div className="flex justify-center items-center h-full">
        <img className="" src={logoImage} alt="DH_Logo" />
      </div>
    </div>
  );
}
