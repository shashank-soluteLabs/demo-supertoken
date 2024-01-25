import React from "react";
import DHSplashScreen from "../../component/DHSplashScreen";
import Footer from "../../component/Footer";
import DH_Logo from "../../images/dh-logo-min-1.svg";
import Prajavani_logo from "../../images/prajavani-logo-img.svg";
import DefaultButton from "../../component/DefaultButton";
import Session from "supertokens-web-js/recipe/session";
import { PRAJAVANI_URL } from "../../contant";

export default function HomeScreen() {
  const ref = localStorage.getItem("ref");
  async function logout () {
    await Session.signOut(); 
    window.location.href = "/";
  }
  return (
    <div className="flex flex-row w-full text-center pt-24 pb-16 px-10 h-screen">
      {ref === PRAJAVANI_URL ? (
        <DHSplashScreen logoImage={Prajavani_logo} className={"div-with-bg-prajavani"} />
      ) : (
        <DHSplashScreen logoImage={DH_Logo}  />
      )}
      <div className="w-1/2 shadow-md rounded-2xl bg-white ml-2 pt-4">
        <p className="text-gray-900 font-bold mb-64 text-2xl">Home Screen</p>
        <DefaultButton onClick={logout} label={"Logout"}/>
        <div className="w-full flex justify-center mt-10 mb-2">
          <div className="w-2/3 text-sm font-normal align-center item center text-gray-600 px-12">
            By signing in or creating an account, you agree with our{" "}
            <span className="font-roboto text-cyan-500 underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            and <span className="text-cyan-500 underline cursor-pointer">Privacy Policy</span>.
          </div>
        </div>
        <Footer footerLable={"Your Login, Simplified"} />
      </div>
    </div>
  );
}
