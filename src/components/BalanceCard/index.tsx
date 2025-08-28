import { RoundArrowLeftDown, RoundArrowRightUp } from "@solar-icons/react";
import Chip from "components/Chip";

function BalanceCard() {
  return (
    <div className="gap-sm p-md flex flex-col rounded-sm bg-blue-600 shadow">
      <p className="text-sm text-white">Saldo Total</p>
      <p className="text-3xl font-semibold text-white">R$ 12.480,25</p>
      <div className="gap-xs flex items-start">
        <Chip variant="green">
          <RoundArrowLeftDown size={14} className="text-green-300" />
          R$ 6.000,00
        </Chip>
        <Chip variant="red">
          <RoundArrowRightUp size={14} className="text-red-500" />
          R$ 3.950,00
        </Chip>
      </div>
    </div>
  );
}

export default BalanceCard;
