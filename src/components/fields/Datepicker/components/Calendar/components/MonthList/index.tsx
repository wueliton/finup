import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useMonthList from "./hooks/useMonthList";
import { monthButtonStyle } from "./styles";
import type { MonthListProps } from "./types";

function MonthList({
  selectedDate,
  month,
  nextTabIndexDate,
  disableTabIndex,
  onSelect,
  onFocusChange,
}: MonthListProps) {
  const { months, isSelectedMonth, handleOnClick, handleKeyDown } =
    useMonthList({
      selectedDate,
      month,
      nextTabIndexDate,
      disableTabIndex,
      onSelect,
      onFocusChange,
    });

  return (
    <div className="grid grid-cols-3 text-center" onKeyDown={handleKeyDown}>
      {months.map((date) => {
        const monthAttributes = isSelectedMonth(date);
        return (
          <div className="px-xs" key={date.getTime()}>
            <div
              className={monthButtonStyle({
                isActive: monthAttributes.isActive,
              })}
              role="button"
              onClick={handleOnClick(date)}
              tabIndex={monthAttributes.tabIndex}
              ref={monthAttributes.ref}
            >
              {format(date, "MMM", { locale: ptBR })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MonthList;
