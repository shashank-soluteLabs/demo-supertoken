import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearPasswordlessLoginAttemptInfo,
  consumePasswordlessCode,
  resendPasswordlessCode,
} from "supertokens-web-js/recipe/thirdpartypasswordless";
import DefaultButton from "./DefaultButton";
import LinkedButton from "./LinkedButton";
import ErrorComponent from "./ErrorComponent";

export default function OtpForm() {
  const numberOfDigits = 6;
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);
  const navigate = useNavigate();

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handlePaste(e) {
    const pastedData = e.clipboardData.getData("text");
    if (pastedData.length === numberOfDigits && /^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, numberOfDigits);
      setOtp(newOtp);
    }
  }

  async function handleOTPInput() {
    try {
      let response = await consumePasswordlessCode({
        userInputCode: otp.join(""),
      });
      if (response.status === "OK") {
        await clearPasswordlessLoginAttemptInfo();
        if (
          response.createdNewRecipeUser &&
          response.user.loginMethods.length === 1
        ) {
          // user sign up success
        } else {
          // user sign in success
        }
        localStorage.setItem("access-token", response.fetchResponse.headers.get('st-access-token'))
        localStorage.setItem("refresh-token", response.fetchResponse.headers.get('st-refresh-token'))
        navigate("/auth/verify");
      } else if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
        // the user entered an invalid OTP
        setOtpError("Invalid OTP");
      } else if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
        // it can come here if the entered OTP was correct, but has expired because
        // it was generated too long ago.
        setOtpError("Invalid OTP");
      } else {
        // this can happen if the user tried an incorrect OTP too many times.
        // or if it was denied due to security reasons in case of automatic account linking

        // we clear the login attempt info that was added when the createCode function
        // was called - so that if the user does a page reload, they will now see the
        // enter email / phone UI again.
        await clearPasswordlessLoginAttemptInfo();
        window.alert("Login failed. Please try again");
        navigate("/auth");
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  async function resendOTP() {
    try {
      let response = await resendPasswordlessCode();

      if (response.status === "RESTART_FLOW_ERROR") {
        // this can happen if the user has already successfully logged in into
        // another device whilst also trying to login to this one.

        // we clear the login attempt info that was added when the createCode function
        // was called - so that if the user does a page reload, they will now see the
        // enter email / phone UI again.
        await clearPasswordlessLoginAttemptInfo();
        window.alert("Login failed. Please try again");
        navigate("/auth");
      } else {
        // OTP resent successfully.
        window.alert("Please check your email for the OTP");
      }
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        console.log("Resend buttn CLicked");
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  return (
    <div>
      <form>
        <div className="w-full flex justify-center items-center">
          {otpError ? (
            <ErrorComponent
              errorMsg={otpError}
              onClick={() => {
                setOtpError("");
                setOtp(new Array(numberOfDigits).fill(""))
              }}
            />
          ) : (
            <div className="mt-16"></div>
          )}
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex items-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                onPaste={handlePaste}
                ref={(reference) =>
                  (otpBoxReference.current[index] = reference)
                }
                className={`border border-solid border-gray-300 w-16 h-auto text-gray-700 text-center text-base px-4 py-3 rounded-md focus:outline-none`}
                style={{ borderColor: "rgba(209, 213, 219, 1)" }}
              />
            ))}
          </div>
        </div>
        <div className="w-full items-center mb-2 mt-4">
          <DefaultButton label={"Verify"} onClick={handleOTPInput} />
        </div>
        <div className="w-full items-center mb-4">
          <LinkedButton label={"Resend OTP"} onClick={resendOTP} />
        </div>
      </form>
    </div>
  );
}
