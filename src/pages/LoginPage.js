import { useLocation } from "react-router-dom";
import DeccanLoginPage from "./DeccanPages/DeccanLoginPage";
import PrajavaniLoginPage from "./PrajavaniPages/PrajavaniLoginPage";
import { PRAJAVANI_URL, REDIRECT_URL } from "../contant";

export default function LoginPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get(REDIRECT_URL);
  localStorage.setItem("ref", ref);
  return (
    <>{ref === PRAJAVANI_URL ? <PrajavaniLoginPage /> : <DeccanLoginPage />}</>
  );
}
