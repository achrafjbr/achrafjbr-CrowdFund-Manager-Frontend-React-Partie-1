import { AtSign, Landmark } from "lucide-react";
import image1 from "../../assets/images/1.jpg";

function InvestorCard({ name, email, balance }) {
  return (
    <div
      className="
      relative
      h-80 rounded-4xl shadow-2xl
      bg-linear-to-br from-indigo-500 via-purple-500
      p-4 flex flex-col justify-end overflow-hidden
    "
    >
      {/* Top avatar */}
      <div className="absolute top-6 left-6">
        <img
          src={image1}
          alt="Investor"
          className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover"
        />
      </div>
      {/* White content card */}
      <div
        className="
        bg-white rounded-3xl p-6
        flex flex-col gap-4 shadow-xl
      "
      >
        <h1 className="text-2xl font-bold">{name || "Unknown"}</h1>

        <div className="flex items-center gap-2 bg-sky-100 p-2 rounded-xl">
          <AtSign size={18} />
          <span>{email || "No email"}</span>
        </div>

        <div className="flex items-center gap-2 bg-pink-100 p-2 rounded-xl">
          <Landmark size={18} />
          <span>{balance ?? 0} $</span>
        </div>
      </div>
    </div>
  );
}

export default InvestorCard;
