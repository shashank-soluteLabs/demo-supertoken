import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyPasswordless from "supertokens-web-js/recipe/thirdpartypasswordless";
import HomeScreen from "./pages/DeccanPages/HomeScreen";
import LoginPage from "./pages/LoginPage";
import OtpPage from "./pages/OtpPage";
import SuccessFulLoginPage from "./pages/SuccessFulLoginPage";
import Spinner from "./component/Spinner";
const baseURL = process.env.REACT_APP_BASE_URL;
const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

SuperTokens.init({
  appInfo: {
    appName: "Testing",
    websiteDomain: "http://localhost:3000",
    apiDomain: "https://f5fe-27-62-197-141.ngrok-free.app",
  },
  clientType: "web",
  recipeList: [Session.init(), ThirdPartyPasswordless.init()],
});
function App() {
  console.log({ apiBaseURL, baseURL });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/verify_otp" element={<OtpPage />} />
        <Route path="/auth/verify" element={<SuccessFulLoginPage />} />
        <Route path="/auth/home_screen" element={<HomeScreen />} />
        <Route path="/auth/callback/:provider" element={<Spinner />} />
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
