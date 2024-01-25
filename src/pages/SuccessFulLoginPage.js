import React from "react";
import { DECCAN_URL, PRAJAVANI_URL, REDIRECT_URL } from "../contant";
import DeccanSuccessfulLoginPage from "./DeccanPages/DeccanSuccessfulLoginPage";
import PrajavaniSuccessfulLoginPage from "./PrajavaniPages/PrajavaniSuccessfuLoginPage";

export default function SuccessFulLoginPage() {
  const ref = localStorage.getItem("ref");
  if (
    !(
      localStorage.getItem("access-token") &&
      localStorage.getItem("refresh-token")
    )
  ) {
    window.location.assign(
      `/auth?${REDIRECT_URL}=${
        ref === PRAJAVANI_URL ? PRAJAVANI_URL : DECCAN_URL
      }`
    );
  }
  
  return (
    <>
      {ref === PRAJAVANI_URL ? (
        <PrajavaniSuccessfulLoginPage />
      ) : (
        <DeccanSuccessfulLoginPage />
      )}
    </>
  );
}
