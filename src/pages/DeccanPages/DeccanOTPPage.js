import DHSplashScreen from "../../component/DHSplashScreen";
import Footer from "../../component/Footer";
import Header from "../../component/Header";
import OtpForm from "../../component/OTPForm";
import otp_icon from "../../images/otp_icon.svg";
import DH_Logo from "../../images/dh-logo-min-1.svg";
import { useNavigate } from "react-router-dom";

export default function DeccanOTPPage() {
  const navigate = useNavigate();
  const userLoginDetail =
    JSON.parse(window.localStorage.getItem("user_login_detail")) || {};
  return (
    <div className="flex flex-row w-full text-center pt-8 px-10">
      <DHSplashScreen logoImage={DH_Logo} />
      <div className="w-1/2 shadow-md bg-white ml-2 rounded-2xl">
        <Header headerImage={otp_icon} />
        <p className="text-gray-900 font-bold mt-14 text-2xl">Verification</p>
        <p className="text-gray-700 font-bold text-base mt-4">
          Verify using OTP or click the magic link sent
        </p>
        <p className="text-gray-700 font-bold text-base mb-2">
          via SMS to{" "}
          <span className="text-gray-900">
            {userLoginDetail.email
              ? userLoginDetail.email
              : userLoginDetail.phone
              ? `+91 ${userLoginDetail.phone}`
              : "-"}
          </span>{" "}
          <span
            className="text-cyan-500 cursor-pointer"
            onClick={() => navigate("/auth")}
          >
            Change
          </span>
        </p>
        <OtpForm />
        <Footer footerLable={"Your Login, Simplified"} />
      </div>
    </div>
  );
}
