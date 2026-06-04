import { Plus } from "lucide-react";
import { InvestIconType } from "../../Utils/investIconTypes";
import InvestCard from "../components/Wallet/InvestCard";

import Projects from "../components/Wallet/Projects";
import { useEffect } from "react";
import {
  getInvestorBalance,
  investisemetOfInvestor,
} from "../../store/slices/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  financedProjects,
  openProject,
  totalInvesti,
  totalInvistiForEachCompanie,
} from "../../Utils/wallet/InvestesementInvestor";

export default function WalletPage() {
  const disptch = useDispatch();
  const { isLoading, isError, investor, investements } = useSelector(
    (state) => state.wallet,
  );
  const getInvestorBalanceHandler = async () => {
    await disptch(getInvestorBalance());
  };
  const getInvestesementInvestorHandler = async () => {
    await disptch(investisemetOfInvestor());
  };

  useEffect(() => {
    getInvestesementInvestorHandler();
    getInvestorBalanceHandler();
  }, []);

  if (isLoading) {
    return <div>Loading.......</div>;
  }
  if (isError) {
    return <div>Loading.......</div>;
  }
  return (
    <div className=" min-h-screen p-2.5 mx-20 mt-5">
      {/* top part */}
      {/* deal with side effect */}
      <div
        className="flex flex-col justify-between outline-1
       outline-gray-300 w-full h-40 rounded-2xl p-5"
      >
        <div>
          <p className="font-bold">Solde disponible</p>
          <p className=" text-gray-500">Montant disponible pour investir</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-2xl">{`${investor.balance} DH`}</p>

          <button
            onClick={() => {
              console.log("JHDJKHSKHDQK");
            }}
            className="flex justify-center items-center
           bg-black text-white p-2 rounded"
          >
            <Plus size={19} />
            Alimenter le solde
          </button>
        </div>
      </div>

      {/* deal with side effect */}
      <div className=" flex gap-4 justify-center items-center mt-7">
        <InvestCard
          icon={InvestIconType.DOLLAR}
          sold={totalInvesti(investements)}
          title="Total Investi"
          sousTitle={`Réparti sur ${financedProjects(investements).length} projets`}
        />
        <InvestCard
          icon={InvestIconType.CHART}
          sold={financedProjects(investements).length}
          title="Projets Financés"
          sousTitle={`${openProject(investements).length} actifs`}
        />
        <InvestCard
          icon={InvestIconType.TRENDING}
          sold={5.4}
          title={"Part Moyenne"}
          sousTitle={"Par projet"}
        />
      </div>

      <section
        className="flex flex-col justify-between outline-1
       outline-gray-300 w-full rounded-2xl p-5 mt-7"
      >
        <div>
          <p className="font-bold">Mes Investissements</p>
          <p className=" text-gray-500">
            Liste détaillée de tous vos projets financés
          </p>
        </div>

        {totalInvistiForEachCompanie(investements).map((companie) => {
          return <Projects companie={companie} />;
        })}
      </section>
    </div>
  );
}
