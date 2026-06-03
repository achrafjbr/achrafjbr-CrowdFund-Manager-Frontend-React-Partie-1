import { useSelector } from "react-redux";
import OwenerDashboard from './OwnerDashboard'
import InvistorDashboard from './InvistorDashboard'
import AdminDashboard from './AdminDashboard'


function DashboardPage() {

const { decodedToken } = useSelector(
  (state) => state.authentication
);
const role = decodedToken?.role
if(role == "owner")return <OwenerDashboard/>
if (role == "investor") return <InvistorDashboard/>
if(role == "admin") return <AdminDashboard/>
  return <p>Unauthorized</p>;
}

export default DashboardPage;
