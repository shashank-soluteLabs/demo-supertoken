import React from "react";
import DHSplashScreen from "../../component/DHSplashScreen";
import DefaultButton from "../../component/DefaultButton";
import Footer from "../../component/Footer";
import Header from "../../component/Header";
import DH_Logo from "../../images/dh-logo-min-1.svg";
import after_login from "../../images/after_login.svg";
import { DECCAN_URL } from "../../contant";

export default function DeccanSuccessfulLoginPage() {
  const redirectTo = `${DECCAN_URL}?access_token=${localStorage.getItem(
    "access-token"
  )}&refresh_token=${localStorage.getItem("refresh-token")}`;
  const [countdown, setCountdown] = React.useState(5);

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
      <DHSplashScreen logoImage={DH_Logo} />
      <div className="w-1/2 shadow-md bg-white ml-2 rounded-2xl">
        <Header headerImage={after_login} />
        <p className="text-gray-900 font-bold mt-14 text-2xl">
          Successfully Verified
        </p>
        <div className="mb-32">
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
            label={"Go to Home Screen"}
            onClick={() => window.location.assign(redirectTo)}
          />
        </div>
        <Footer footerLable={"Your Login, Simplified"} />
      </div>
    </div>
  );
}
