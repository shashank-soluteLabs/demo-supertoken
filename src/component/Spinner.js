import React from "react";
import { useNavigate } from "react-router";
import { thirdPartySignInAndUp } from "supertokens-web-js/recipe/thirdpartypasswordless";
import { DECCAN_URL, PRAJAVANI_URL } from "../contant";
export default function Spinner() {
  const navigate = useNavigate();
  const ref = localStorage.getItem("ref");
  React.useEffect(() => {
    console.log("effect is running");
    const handleGoogleCallback = async () => {
      try {
        const response = await thirdPartySignInAndUp();
        if (response.status === "OK") {
          console.log(response.user);
          if (
            response.createdNewRecipeUser &&
            response.user.loginMethods.length === 1
          ) {
            // sign up successful
          } else {
            // sign in successful St-Access-Token St-Refresh-Token
          }
          console.log("response", response);
          localStorage.setItem(
            "access-token",
            response.fetchResponse.headers.get("st-access-token")
          );
          localStorage.setItem(
            "refresh-token",
            response.fetchResponse.headers.get("st-refresh-token")
          );
          if (ref === PRAJAVANI_URL) {
            window.location.assign(
              `${PRAJAVANI_URL}?access_token=${response.fetchResponse.headers.get(
                "st-access-token"
              )}&refresh_token=${response.fetchResponse.headers.get(
                "st-refresh-token"
              )}`
            );
          } else {
            window.location.assign(
              `${DECCAN_URL}?access_token=${response.fetchResponse.headers.get(
                "st-access-token"
              )}&refresh_token=${response.fetchResponse.headers.get(
                "st-refresh-token"
              )}`
            );
          }
        } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
          // this can happen due to automatic account linking. Please see our account linking docs
        } else {
          window.alert(
            "No email provided by social login. Please use another form of login"
          );
          navigate("/auth"); // redirect back to login page
        }
      } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you.
          window.alert(err.message);
        } else {
          console.log("err", err);
          window.alert("Oops! Something went wrong.");
        }
      }
    };
    handleGoogleCallback();
  }, []);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="fill">
        <div className="spinner">
          <svg version="1.1" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="10"
              stroke="rgb(255, 155, 51)"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                values="0;-30;-124"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dasharray"
                values="0,200;110,200;110,200"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  );
}
