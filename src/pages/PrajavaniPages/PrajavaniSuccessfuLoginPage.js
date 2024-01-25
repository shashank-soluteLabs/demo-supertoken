import React from "react";
import DHSplashScreen from "../../component/DHSplashScreen";
import PrajavaniOtpFooter from "../../component/PrajavaniOtpFooter";
import DefaultButton from "../../component/DefaultButton";
import Header from "../../component/Header";
import Prajavani_after_login from "../../images/prajavani-after-login.svg";
import Prajavani_logo from "../../images/prajavani-logo-img.svg";
import { PRAJAVANI_URL } from "../../contant";

export default function PrajavaniSuccessfulLoginPage() {
  const [countdown, setCountdown] = React.useState(5);
  const redirectTo = `${PRAJAVANI_URL}?access_token=${localStorage.getItem(
    "access-token"
  )}&refresh_token=${localStorage.getItem("refresh-token")}`;

  React.useEffect(() => {
    const delay = 5000;
    const timeoutId = setTimeout(() => {
      if (countdown === 0) {
        window.location.assign(redirectTo);
      } else {
        setCountdown(countdown - 1);
      }
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [countdown]);

  return (
    <div className="flex flex-row w-full text-center pt-8 px-10">
      <DHSplashScreen
        className={"div-with-bg-prajavani"}
        logoImage={Prajavani_logo}
      />
      <div className="w-1/2 shadow-md bg-white ml-2 rounded-2xl">
        <Header
          headerImage={Prajavani_after_login}
          className={"bg-yellow-400"}
        />
        <p className="text-gray-900 font-bold mt-14 text-2xl">
          ಯಶಸ್ವಿಯಾಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ
        </p>
        <div className="mb-52">
          <p className="text-gray-700 font-bold text-base mt-4">
            Your Mobile number has been successfully
          </p>
          <p className="text-gray-700 font-bold text-base">
            verified. You will auto redirect to home
          </p>
          <p className="text-gray-700 font-bold text-base">
            screen in {countdown} secs...
          </p>
        </div>
        <div className="w-full items-center mb-2 mt-4">
          <DefaultButton
            label={"ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಹೋಗಿ"}
            className={"bg-amber-255 !text-gray-900"}
            onClick={() => {
              window.location.assign(redirectTo);
            }}
          />
        </div>
        <PrajavaniOtpFooter footerLable={"ನಿಮ್ಮ ಲಾಗಿನ್, ಈಗ ಸರಳ"} />
      </div>
    </div>
  );
}
