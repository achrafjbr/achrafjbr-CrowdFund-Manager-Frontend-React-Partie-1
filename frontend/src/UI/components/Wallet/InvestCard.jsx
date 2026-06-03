import { ChartLine, DollarSign, TrendingUp } from "lucide-react";

function InvestCard({ title, sousTitle, sold, icon }) {
  return (
    <div
      className="flex flex-col flex-1 justify-between outline-1
       outline-gray-300  h-40 rounded-2xl p-5"
    >
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-500">{title}</p>
        {icon === "dollar" ? (
          <DollarSign size={20} color="gray" />
        ) : icon === "chart" ? (
          <ChartLine size={20} color="gray" />
        ) : (
          <TrendingUp size={20} color="gray" />
        )}
      </div>

      <div>
        <p className="font-bold text-2xl">{` ${sold} ${
          icon === "dollar" ? "€" : icon === "trending" ? "%" : ""
        }`}</p>
        <p className=" text-gray-400 text-[0.9rem] ">{sousTitle}</p>
      </div>
    </div>
  );
}

export default InvestCard;
