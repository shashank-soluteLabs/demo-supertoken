import React from "react";
import Apple_logo from "../images/apple_icon.svg";
import Google_logo from "../images/google_icon.svg";
import fb_logo from "../images/fb_icon.svg";
import {
  getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
  getAuthorisationURLWithQueryParamsAndSetState,
} from "supertokens-web-js/recipe/thirdpartypasswordless";

export default function SocialLogin({}) {
  async function googleSignInClicked() {
    try {
      const authUrl =
        await getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
          thirdPartyId: "google",

          // This is where Google should redirect the user back after login or error.
          // This URL goes on the Google's dashboard as well.
          frontendRedirectURI: "http://localhost:3000/auth/callback/google",
          // frontendRedirectURI: "http://<YOUR_WEBSITE_DOMAIN>/auth/callback/google",
        });

      /*
        Example value of authUrl: https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&client_id=1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com&state=5a489996a28cafc83ddff&redirect_uri=https%3A%2F%2Fsupertokens.io%2Fdev%2Foauth%2Fredirect-to-app&flowName=GeneralOAuthFlow
        */

      // we redirect the user to google for auth.
      window.location.assign(authUrl);
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }
  async function facebookSignInClicked() {
    try {
      const authUrl =
        await getThirdPartyAuthorisationURLWithQueryParamsAndSetState({
          thirdPartyId: "facebook",

          // This is where Google should redirect the user back after login or error.
          // This URL goes on the Google's dashboard as well.
          frontendRedirectURI: "http://localhost:3000/auth/callback/facebook",
          // frontendRedirectURI: "http://<YOUR_WEBSITE_DOMAIN>/auth/callback/google",
        });

      /*
        Example value of authUrl: https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline&include_granted_scopes=true&response_type=code&client_id=1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com&state=5a489996a28cafc83ddff&redirect_uri=https%3A%2F%2Fsupertokens.io%2Fdev%2Foauth%2Fredirect-to-app&flowName=GeneralOAuthFlow
        */

      // we redirect the user to google for auth.
      window.location.assign(authUrl);
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }
  async function appleSignInClicked() {
    try {
      const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
        thirdPartyId: "apple",

        frontendRedirectURI: "http://localhost:3000/auth/callback/apple", // This is an example callback URL on your frontend. You can use another path as well.
        redirectURIOnProviderDashboard:
          "http://localhost:3001/auth/callback/apple", // This URL goes on the Apple's dashboard
      });

      // we redirect the user to apple for auth.
      window.location.assign(authUrl);
    } catch (err) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }
  return (
    <div className="flex justify-center w-full p-2.5">
      <div className="w-1/2 flex flex-row justify-center">
        <div className="border border-solid border-gray-300 w-1/3 py-1 rounded-md shadow-sm">
          <img src={Apple_logo} alt="apple" onClick={appleSignInClicked} />
        </div>
        <div className="border border-solid border-gray-300 w-1/3 mx-3 py-1 rounded-md shadow-sm">
          <img src={Google_logo} alt="apple" onClick={googleSignInClicked} />
        </div>
        <div className="border border-solid border-gray-300 w-1/3 py-1 rounded-md shadow-sm">
          <img src={fb_logo} alt="apple" onClick={facebookSignInClicked} />
        </div>
      </div>
    </div>
  );
}
