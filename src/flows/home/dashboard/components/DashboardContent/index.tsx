import { BalanceCard } from "@components";
import StatementLine from "components/StatementLine";
import { memo } from "react";

function DashboardContent() {
  return (
    <>
      <div className="gap-md space-y-md md:columns-2">
        <BalanceCard />
        <div className="p-md gap-md flex break-inside-avoid flex-col rounded-sm border border-gray-200">
          <p className="text-sm text-black/60">Por Categoria</p>
          <div className="gap-x-md gap-y-xs grid grid-cols-[min-content_1fr] items-center">
            Alimentação
            <div className="h-sm relative w-full overflow-hidden rounded-full bg-gray-100">
              <span className="absolute h-full w-8/12 rounded-full bg-blue-500" />
            </div>
            Lazer
            <div className="h-sm w-full rounded-full bg-gray-100"></div>
            Assinaturas
            <div className="h-sm w-full rounded-full bg-gray-100"></div>
          </div>
        </div>
        <div className="p-md gap-md flex break-inside-avoid flex-col rounded-sm border border-gray-200">
          <p className="text-sm text-black/60">Últimos lançamentos</p>
          <div className="gap-sm flex flex-col">
            <StatementLine
              to={""}
              icon="Tv"
              title="Netflix"
              category="Assinaturas"
              updatedAt="Hoje às 9:00"
              amount={-27.6}
            />
            <StatementLine
              to={""}
              icon="Wallet"
              title="Pagamento WeFit"
              category="Salário"
              updatedAt="Hoje às 9:00"
              amount={800}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(DashboardContent);
