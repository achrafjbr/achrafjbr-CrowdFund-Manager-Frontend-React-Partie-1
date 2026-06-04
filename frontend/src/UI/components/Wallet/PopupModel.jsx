import { useDispatch, useSelector } from "react-redux";
import {
  addBalance,
  submitBalance,
  toggle,
} from "../../../store/slices/walletSlice";
import { useState } from "react";

function PopupModel() {
  const dispatch = useDispatch();

  const showAndHidPopupHandler = (visiblity) => {
    dispatch(toggle({ visiblity: visiblity }));
  };

  const [montant, setMontant] = useState(0.0);

  const onChangeBalanceHandler = (event) => {
    const value = event.target.value;
    setMontant(parseInt(value));
  };

  const submitBalanceHandler = () => {
    dispatch(addBalance(montant));
    dispatch(submitBalance({ isShown: true }));
    showAndHidPopupHandler(false);
  };

  return (
    <>
      <div
        onClick={() => {
          showAndHidPopupHandler(false);
        }}
        className="fixed z-10
                    inset-0
                  bg-black/20"
      ></div>
      <div
        className="absolute z-50 right-1/2 top-1/2
                      translate-x-1/2 -translate-y-1/2 
                      bg-white p-4 rounded-2xl px-7"
      >
        <div className="">
          <div className="pb-2.5">
            <p className="font-bold">Alimenter votre portefeuille</p>
            <p className=" text-gray-500">
              Entrez le montant que vous souhaitez déposer
            </p>
          </div>
          <p className="font-mono p-1">Montant(dh)</p>
          <input
            onChange={(e) => onChangeBalanceHandler(e)}
            value={montant}
            className="outline-2 rounded p-1.5 outline-gray-500 w-full mb-3"
            type="number"
            name="montant"
            placeholder="0.00"
          />

          <button
            onClick={() => submitBalanceHandler()}
            className="flex justify-center items-center
           bg-black text-white p-2 rounded w-full cursor-pointer"
          >
            Confirmer le dépot
          </button>
        </div>
      </div>
    </>
  );
}

export default PopupModel;
