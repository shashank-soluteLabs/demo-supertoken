import React from "react";
import DHSplashScreen from "../../component/DHSplashScreen";
import Footer from "../../component/Footer";
import DefaultButton from "../../component/DefaultButton";
import SwitchTabs from "../../component/SwitchTab";
import ErrorComponent from "../../component/ErrorComponent";
import smartphone_line from "../../images/smartphone-line.svg";
import email_line from "../../images/mail-line.svg";
import India_flag from "../../images/flag.jpg";
import DH_Logo from "../../images/dh-logo-min-1.svg";
import SocialLogin from "../../component/SocialLogin";
import {
  createPasswordlessCode,
  getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
} from "supertokens-web-js/recipe/thirdpartypasswordless";
import { doesSessionExist } from "supertokens-web-js/recipe/session";
import { useNavigate } from "react-router-dom";
import { DECCAN_URL } from "../../contant";

export default function DeccanLoginPage() {
  const [tab, setTab] = React.useState("Mobile");
  const [inputError, setInputError] = React.useState(null);
  const [isSessionExist, setIsSessionExist] = React.useState(null);
  const [formData, setFormData] = React.useState({
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const redirectTo = `${DECCAN_URL}?access_token=${localStorage.getItem(
    "access-token"
  )}&refresh_token=${localStorage.getItem("refresh-token")}`;
console.log("redirectTo", redirectTo);
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
      tab === "Mobile"
        ? { phoneNumber: `+91${formData.phone}` }
        : { email: formData.email };
    const errMsg = tab === "Mobile" ? "Invalid phone number" : "Invalid email";
    if (formData.phone || formData.email) {
      try {
        let response = await createPasswordlessCode(responsePayload);
        if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
          // this can happen due to automatic account linking. See that section in our docs.
        } else {
          navigate("/auth/verify_otp");
          localStorage.setItem("user_login_detail", JSON.stringify(formData));
          // console.log("response", response);
          // const headers = response.fetchResponse.headers;
          // const contentType = headers.get("content-type");
          // console.log("Content-Type:", contentType);
          // headers.forEach((value, name) => {
          //   console.log(`${name}: ${value}`);
          // });
          // Magic link sent successfully.
          // window.alert("Please check your email for the magic link");
        }
      } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you,
          // or if the input email / phone number is not valid.
          console.log("errormsg", err);
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
    <div className="flex flex-row w-full text-center justify-center pt-8 h-full px-10">
      <DHSplashScreen logoImage={DH_Logo} />
      <div className="w-1/2 shadow-md rounded-2xl bg-white ml-2 pt-4">
        <p className="text-gray-900 font-bold mb-4 text-2xl">
          Log in or Create Your Account
        </p>
        <form>
          <div className="w-full flex justify-center">
            <SwitchTabs
              data={[
                { tabName: "Mobile", tabLogo: smartphone_line },
                { tabName: "Email", tabLogo: email_line },
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
          {tab === "Mobile" ? (
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
                type="number"
                name="phone"
                id="phone"
                className="text-base text-gray-500 pl-3.5 py-2 border border-solid border-gray-300 border-l-0 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm rounded-md rounded-l-none"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center">
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-1/2 text-base text-gray-500 pl-3.5 py-2 border border-solid border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-sm rounded-md"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="w-full items-center mb-8 mt-4">
            <DefaultButton label={"Continue"} onClick={sendMagicLink} />
          </div>
        </form>
        <div className="flex justify-center mb-1">
          <div className="w-1/2 flex flex-row justify-between">
            <div className="w-1/4 pr-2 pt-2.5">
              <div className="divider-clr-section border-t"></div>
            </div>
            <p className="w-1/2 text-gray-500 font-medium">Or Continue With</p>
            <div className="w-1/4 pl-2 pt-2.5">
              <div className="divider-clr-section border-t"></div>
            </div>
          </div>
        </div>
        <SocialLogin />
        <div className="w-full flex justify-center mt-10 mb-2">
          <div className="w-2/3 text-sm font-normal align-center item center text-gray-600 px-12">
            By signing in or creating an account, you agree with our{" "}
            <span className="font-roboto text-cyan-500 underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and{" "}
            <span className="text-cyan-500 underline cursor-pointer">
              Privacy Policy.
            </span>
          </div>
        </div>
        <Footer footerLable={"Your Login, Simplified"} />
      </div>
    </div>
  );
}
