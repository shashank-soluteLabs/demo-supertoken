import React from "react";
;
export default function PrajavaniOtpFooter({footerLable}) {
  return (
    <div className="w-full py-2 footer-bg-gradiant">
      <div className="text-sm items-center text-gray-600 font-medium">
        {footerLable}
      </div>
    </div>
  );
}
