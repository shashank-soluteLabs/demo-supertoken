import { PRAJAVANI_URL } from "../contant";
import DeccanOTPPage from "./DeccanPages/DeccanOTPPage";
import PrajavaniOTPPage from "./PrajavaniPages/PrajavaniOTPPage";

export default function OtpPage() {
  const ref = localStorage.getItem("ref");
  return <>{ref === PRAJAVANI_URL ? <PrajavaniOTPPage reference={ref} /> : <DeccanOTPPage />}</>;
}
