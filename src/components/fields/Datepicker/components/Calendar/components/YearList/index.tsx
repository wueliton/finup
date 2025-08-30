import useYearList from "./hooks/useYearList";
import { yearButtonStyle } from "./styles";
import type { YearListProps } from "./types";

function YearList({ year, selectedDate, onSelect }: YearListProps) {
  const { yearList, isSelectedYear, handleOnClick } = useYearList({
    year,
    selectedDate,
    onSelect,
  });

  return (
    <div className="grid grid-cols-3 text-center">
      {yearList.map((year) => (
        <div className="px-xs" key={year}>
          <div
            className={yearButtonStyle({ isActive: isSelectedYear(year) })}
            role="button"
            onClick={handleOnClick(year)}
          >
            {year}
          </div>
        </div>
      ))}
    </div>
  );
}

export default YearList;
