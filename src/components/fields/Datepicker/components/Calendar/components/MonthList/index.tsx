import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useMonthList from "./hooks/useMonthList";
import { monthButtonStyle } from "./styles";
import type { MonthListProps } from "./types";

function MonthList({ selectedDate, month, onSelect }: MonthListProps) {
  const { months, isSelectedMonth, handleOnClick } = useMonthList({
    selectedDate,
    month,
    onSelect,
  });

  return (
    <div className="grid grid-cols-3 text-center">
      {months.map((date) => (
        <div className="px-xs" key={date.getTime()}>
          <div
            className={monthButtonStyle({
              isActive: isSelectedMonth(date),
            })}
            role="button"
            onClick={handleOnClick(date)}
          >
            {format(date, "MMM", { locale: ptBR })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MonthList;
