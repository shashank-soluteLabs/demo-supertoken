import React from "react";
import DH_logo_white_bg from "../images/DHLogo_WhiteBG.svg";
import prajavani_logo from "../images/prajavani_logo.svg";
import mayura_logo from "../images/mayura_logo.svg";
import sudha_logo from "../images/sudha_logo.svg";
export default function Footer({footerLable}) {
  return (
    <div className="w-full py-2 footer-bg-gradiant">
      <div className="text-sm items-center text-gray-600 font-medium">
        {footerLable}
      </div>
      <div className="flex justify-center w-full p-1">
        <div className="w-1/2 flex flex-row justify-center items-center">
          <img src={DH_logo_white_bg} alt="apple" className="mx-2" />
          <img src={prajavani_logo} alt="apple" className="mx-2" />
          <img src={mayura_logo} alt="apple" className="mx-2" />
          <img src={sudha_logo} alt="apple" className="mx-2" />
        </div>
      </div>
    </div>
  );
}
