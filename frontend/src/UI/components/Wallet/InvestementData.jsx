import { CalendarFold, ChartLine, DollarSign } from "lucide-react";

function InvestementData({ icon, title }) {
  return (
    <div className="flex gap-1.5 justify-center items-center">
      {icon === "dollar" ? (
        <DollarSign size={17} color="gray" />
      ) : icon === "chart" ? (
        <ChartLine size={17} color="gray" />
      ) : (
        <CalendarFold size={17} color="gray" />
      )}
      <div>{title}</div>
    </div>
  );
}

export default InvestementData;
