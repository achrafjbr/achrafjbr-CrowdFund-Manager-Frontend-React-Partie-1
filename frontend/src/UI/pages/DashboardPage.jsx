import { useSelector } from "react-redux";

function DashboardPage() {
  const { isLoading, isError, user } = useSelector(
    (state) => state.authentication,
  );
  console.log("user", user);
  console.log("isError", isError);
  console.log("isLoading", isLoading);
  return <div>DashboardPage</div>;
}

export default DashboardPage;
