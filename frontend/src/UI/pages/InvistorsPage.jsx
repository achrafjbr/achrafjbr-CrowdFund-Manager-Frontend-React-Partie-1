import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestors } from "../../store/slices/investorsSlice";
import InvestorCard from "../components/InvestorCard";
import noData from "../../assets/images/no-data.png";
import Spinner from "../Spinner";

function InvistorsPage() {
  const { isLoading, investors } = useSelector((state) => state.investors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvestors());
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return investors.length == 0 ? (
    <div className="flex justify-center items-center">
      <div className="">
        <img src={noData} alt="Investor" className="object-cover" />
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {investors.map(({ _id, name, email, balance }) => (
        <InvestorCard key={_id} name={name} balance={balance} email={email} />
      ))}
    </div>
  );
}

export default InvistorsPage;
