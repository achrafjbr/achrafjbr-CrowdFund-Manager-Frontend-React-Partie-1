import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvestors } from "../../store/slices/investorsSlice";
import InvestorCard from "../components/InvestorCard";
import Loading from "../components/Loading";

function InvistorsPage() {
  useDispatch();
  const { isLoading, isError, investors } = useSelector(
    (state) => state.investors,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestors());
  }, []);

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    <div>Loading...</div>;
  } else {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {investors.map(({ _id, name, email, balance }) => (
          <InvestorCard key={_id} name={name} balance={balance} email={email} />
        ))}
      </div>
    );
  }
}

export default InvistorsPage;
