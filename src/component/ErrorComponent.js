import alert_line from "../images/alert-line.svg";
import close_line from "../images/close-line.svg";
export default function ErrorComponent({errorMsg, onClick}) {
  return (
    <div className="w-1/2 flex justify-between items-center py-3 px-4 bg-rose-50 text-gray-600 mt-4 mb-1">
      <img src={alert_line} alt="alert_line" />
      <p className="text-left text-sm text-invalid w-4/5">{errorMsg}</p>
      <img src={close_line} alt="close_line" onClick={onClick} />
    </div>
  );
}
