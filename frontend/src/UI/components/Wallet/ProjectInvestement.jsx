import { investesementDatatype } from "../../../Utils/investIconTypes";

export default function ProjectInvestement({ type, info }) {
  return (
    <div className=" font-bold text-2xl flex gap-1.5 justify-center items-center">
      <div>{info}</div>
      {type === investesementDatatype.MONTANT ? (
        <div>€</div>
      ) : type === investesementDatatype.POURCENTAGE ? (
        <div>%</div>
      ) : (
        <></>
      )}
    </div>
  );
}
