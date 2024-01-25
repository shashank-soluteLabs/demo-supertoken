export default function DefaultButton({ label, className, onClick }) {
  return (
    <>
      <button
        className={`w-1/2 bg-sky-500 text-white border-none px-4 py-3 shadow-sm rounded-lg cursor-pointer text-base font-semibold ${className}`}
        type="button"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}
