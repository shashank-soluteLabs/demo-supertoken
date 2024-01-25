import Prajavani_otp_icon from "../../images/prajavani-otp-icon.svg";
import Prajavani_logo from "../../images/prajavani-logo-img.svg";
import DHSplashScreen from "../../component/DHSplashScreen";
import Header from "../../component/Header";
import PrajavaniOtpForm from "../../component/PrajavaniOtpForm";
import PrajavaniOtpFooter from "../../component/PrajavaniOtpFooter";
import { useNavigate } from "react-router-dom";
import { REDIRECT_URL } from "../../contant";

export default function PrajavaniOTPPage({reference}) {
  const navigate = useNavigate();
  const userLoginDetail =
    JSON.parse(window.localStorage.getItem("user_login_detail")) || {};
  return (
    <div className="flex flex-row w-full text-center pt-8 px-10">
      <DHSplashScreen
        className={"div-with-bg-prajavani"}
        logoImage={Prajavani_logo}
      />
      <div className="w-1/2 shadow-md bg-white ml-2 rounded-2xl">
        <Header headerImage={Prajavani_otp_icon} className={"bg-yellow-400"} />
        <p className="text-gray-900 font-bold mt-14 text-2xl">ಪರಿಶೀಲನೆ</p>
        <p className="text-gray-700 font-bold text-base mt-4">
          ಒಟಿಪಿ ಬಳಸಿ ದೃಢೀಕರಿಸಿ ಅಥವಾ{" "}
          <span className="text-gray-900">
            {userLoginDetail.email
              ? userLoginDetail.email
              : userLoginDetail.phone
              ? `+91 ${userLoginDetail.phone}`
              : "-"}
          </span>{" "}
          ಗೆ ಕಳುಹಿಸಿದ
        </p>
        <p className="text-gray-700 font-bold text-base mb-2">
          ಎಸ್ಎಂಎಸ್ ಮೂಲಕ ಕಳುಹಿಸಿದ ಮ್ಯಾಜಿಕ್ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ{" "}
          <span
            className="text-cyan-500 cursor-pointer"
            onClick={() => navigate(`/auth?${REDIRECT_URL}=${reference}`)}
          >
            ಬದಲಾಯಿಸಿ
          </span>
        </p>
        <PrajavaniOtpForm reference={reference}/>
        <PrajavaniOtpFooter footerLable={"ನಿಮ್ಮ ಲಾಗಿನ್, ಈಗ ಸರಳ"} />
      </div>
    </div>
  );
}
