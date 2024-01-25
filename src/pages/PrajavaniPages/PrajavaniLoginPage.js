import React from "react";
import Footer from "../../component/Footer";
import SwitchTabs from "../../component/SwitchTab";
import smartphone_line from "../../images/smartphone-line.svg";
import email_line from "../../images/mail-line.svg";
import India_flag from "../../images/flag.jpg";
import DefaultButton from "../../component/DefaultButton";
import ErrorComponent from "../../component/ErrorComponent";
import DHSplashScreen from "../../component/DHSplashScreen";
import Prajavani_logo from "../../images/prajavani-logo-img.svg";
import SocialLogin from "../../component/SocialLogin";
import { createPasswordlessCode } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { doesSessionExist } from "supertokens-web-js/recipe/session";
import { useNavigate } from "react-router-dom";
import { PRAJAVANI_URL } from "../../contant";

export default function PrajavaniLoginPage() {
  const [tab, setTab] = React.useState("ಮೊಬೈಲ್");
  const [formData, setFormData] = React.useState({
    email: "",
    phone: "",
  });
  const [inputError, setInputError] = React.useState(null);
  const [isSessionExist, setIsSessionExist] = React.useState(null);
  const navigate = useNavigate();

  const redirectTo = `${PRAJAVANI_URL}?access_token=${localStorage.getItem(
    "access-token"
  )}&refresh_token=${localStorage.getItem("refresh-token")}`;
  
  React.useEffect(() => {
    const checkSession = async () => {
      try {
        if (await doesSessionExist()) {
          window.location.assign(redirectTo)
          setIsSessionExist(true);
          console.log("User is logged in");
        } else {
          setIsSessionExist(false);
          console.log("User has not logged in yet");
        }
      } catch (error) {
        setIsSessionExist(false);
        console.error("Error checking session:", error);
      }
    };
    checkSession();
  }, [isSessionExist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function sendMagicLink() {
    const responsePayload =
      tab === "ಮೊಬೈಲ್"
        ? { phoneNumber: `+91${formData.phone}` }
        : { email: formData.email };
    const errMsg = tab === "ಮೊಬೈಲ್" ? "ಅಮಾನ್ಯ ಫೋನ್ ಸಂಖ್ಯೆ" : "Invalid email";
    if (formData.phone || formData.email) {
      try {
        let response = await createPasswordlessCode(responsePayload);

        if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
          // this can happen due to automatic account linking. See that section in our docs.
        } else {
          console.log("response", response);
          navigate("/auth/verify_otp");
          localStorage.setItem("user_login_detail", JSON.stringify(formData));
          // Magic link sent successfully.
          // window.alert("Please check your email for the magic link");
        }
      } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you,
          // or if the input email / phone number is not valid.
          setInputError(errMsg);
        } else {
          console.log("formData", formData);
          window.alert("Oops! Something went wrong.");
        }
      }
    } else {
      setInputError(errMsg);
    }
  }
  return (
    <div className="flex flex-row w-full text-center pt-8 px-10">
      <DHSplashScreen
        className={"div-with-bg-prajavani"}
        logoImage={Prajavani_logo}
      />
      <div className="w-1/2 shadow-md rounded-2xl bg-white ml-2 pt-4">
        <div className="w-full flex justify-center items-center text-center">
          <p className="w-1/2 flex justify-center items-center text-center text-gray-900 font-bold mb-2 text-2xl">
            ಲಾಗ್ ಇನ್ ಆಗಿರಿ ಅಥವಾ ನಿಮ್ಮ ಖಾತೆ ರಚಿಸಿ
          </p>
        </div>
        <form>
          <div className="w-full flex justify-center">
            <SwitchTabs
              data={[
                { tabName: "ಮೊಬೈಲ್", tabLogo: smartphone_line },
                { tabName: "ಇಮೇಲ್", tabLogo: email_line },
              ]}
              setTab={setTab}
              setInputError={setInputError}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            {inputError ? (
              <ErrorComponent
                errorMsg={inputError}
                onClick={() => setInputError("")}
              />
            ) : (
              <div className="mt-16"></div>
            )}
          </div>
          {tab === "ಮೊಬೈಲ್" ? (
            <div className="w-full flex justify-center items-center">
              <button className="text-base text-gray-500 px-3.5 py-2 border border-solid border-gray-300 border-r-0 pointer-events-none shadow-sm rounded-md rounded-r-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                <img
                  src={India_flag}
                  alt="flag"
                  className="items-center -mb-0.5"
                />{" "}
                +91
              </button>
              <input
                type="text"
                name="phone"
                id="phone"
                className="text-base text-gray-500 pl-3.5 py-2 border border-solid border-gray-300 border-l-0 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm rounded-md rounded-l-none"
                placeholder="ಮೊಬೈಲ್ ನಂಬರ"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <input
                type="text"
                name="email"
                id="email"
                className="w-1/2 text-base text-gray-500 pl-3.5 py-2 border border-solid border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm rounded-md"
                placeholder="ಇಮೇಲ್"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="w-full items-center mb-4 mt-4">
            <DefaultButton
              label={"ಮುಂದುವರಿಸಿ"}
              className={"bg-amber-255 !text-gray-900"}
              onClick={sendMagicLink}
            />
          </div>
        </form>
        <div className="flex justify-center mb-1">
          <div className="w-1/2 flex flex-row justify-content">
            <div className="w-2/12 pr-1 pt-2.5">
              <div className="divider-clr-section border-t"></div>
            </div>
            <p className="w-8/12 text-gray-500 font-medium">
              ಅಥವಾ ಹೀಗೆ ಮುಂದುವರಿಸಿ
            </p>
            <div className="w-2/12 pl-1 pt-2.5">
              <div className="divider-clr-section border-t"></div>
            </div>
          </div>
        </div>
        <SocialLogin />
        <div className="w-full flex justify-center mt-4 mb-2">
          <div className="w-2/3 text-sm font-normal align-center item center text-gray-600 px-12">
            ಸೈನ್ ಇನ್ ಆಗುವ ಅಥವಾ ಖಾತೆ ರಚಿಸುವ ಮೂಲಕ, ಷರತ್ತುಗಳು ಹಾಗೂ{" "}
            <span className="font-roboto text-cyan-500 underline cursor-pointer">
              ನಿಯಮಗಳು ಮತ್ತು ಗೋಪ್ಯತಾ
            </span>{" "}
            ನೀತಿಗೆ ನೀವು{" "}
            <span className="text-cyan-500 underline cursor-pointer">ಸಮ್ಮತಿಸುತ್ತೀರಿ</span>.
          </div>
        </div>
        <Footer footerLable={"ನಿಮ್ಮ ಲಾಗಿನ್, ಈಗ ಸರಳ"} />
      </div>
    </div>
  );
}
