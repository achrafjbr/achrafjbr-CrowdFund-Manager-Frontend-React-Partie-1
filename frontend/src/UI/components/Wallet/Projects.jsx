import FinanciedProjects from "./FinanciedProjects";
import InvestementData from "./InvestementData";
import {
  investesementDatatype,
  InvestIconType,
} from "../../../Utils/investIconTypes";
import ProjectInvestement from "./ProjectInvestement";

function Projects() {
  return (
    <>
      <div>
        <p className="font-bold">Mes Investissements</p>
        <p className=" text-gray-500">
          Liste détaillée de tous vos projets financés
        </p>
      </div>

      <div
        className="flex flex-col justify-between outline-1
       outline-gray-300 w-full rounded p-5 mt-7"
      >
        {/* deal with side effect */}
        <FinanciedProjects
          isOpen={false}
          companyName="EcoTech - Énergie Solaire"
        />

        <div className="flex justify-between items-start mt-1.5">
          <InvestementData
            title={"Montant Investi"}
            icon={InvestIconType.DOLLAR}
          />
          <InvestementData
            title={"Pourcentage Détenu"}
            icon={InvestIconType.CHART}
          />
          <InvestementData
            title={"Date de Participation"}
            icon={InvestIconType.TRENDING}
          />
        </div>

        {/* deal with side effect */}
        <div className="flex justify-between items-start mt-1.5">
          <ProjectInvestement
            type={investesementDatatype.MONTANT}
            info={50000}
          />
          <ProjectInvestement
            type={investesementDatatype.POURCENTAGE}
            info={4.7}
          />
          <ProjectInvestement
            type={investesementDatatype.DATE}
            info={"25 mai 2026"}
          />
        </div>
      </div>
    </>
  );
}

export default Projects;
