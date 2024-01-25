export default function Header({ headerImage, className }) {
  return (
    <div className={`bg-cyan-600 h-20 rounded-t-2xl flex justify-center items-center relative ${className}`}>
      <img src={headerImage} alt="otp_icon" className="absolute top-10" />
    </div>
  );
}
