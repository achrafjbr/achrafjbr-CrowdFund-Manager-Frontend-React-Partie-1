import { useSelector } from "react-redux";
import { getInvestorsApi } from "../../services/investorsService";

function DashboardPage() {
  // Drari had star katjib mano token mdecodi kijib lik objet fih objet=> {userId:hanaId, role:hnarole}
  // Ila bghito txikiw 3la role o id dial user bax tjib profile dialo o la xi haja.
  const { decodedToken } = useSelector((state) => state.authentication);

  return <div>DashboardPage</div>;
}

export default DashboardPage;
