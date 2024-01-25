export default function LinkedButton({ label, className, onClick }) {
  return (
    <>
      <button
        className={`bg-transparent text-cyan-500 border-none px-2 py-1 text-base cursor-pointer font-medium ${className}`}
        type="button"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}
