import FinanciedProjects from "./FinanciedProjects";
import InvestementData from "./InvestementData";
import {
  investesementDatatype,
  InvestIconType,
} from "../../../Utils/investIconTypes";
import ProjectInvestement from "./ProjectInvestement";

function Projects({ companie }) {
  return (
    <>
      <div
        className="flex flex-col justify-between outline-1
       outline-gray-300 w-full rounded p-5 mt-7"
      >
        {/* deal with side effect */}
        <FinanciedProjects
          isOpen={companie.companieStatus === "open" ? true : false}
          companyName={companie.companieName}
          // "EcoTech - Énergie Solaire"
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
            info={companie.raisedAmount}
          />
          <ProjectInvestement
            type={investesementDatatype.POURCENTAGE}
            info={companie.fundingPercentage}
          />
          <ProjectInvestement
            type={investesementDatatype.DATE}
            info={companie.createdAt}
          />
        </div>
      </div>
    </>
  );
}

export default Projects;
