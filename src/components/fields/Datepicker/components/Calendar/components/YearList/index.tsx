import useYearList from "./hooks/useYearList";
import { yearButtonStyle } from "./styles";
import type { YearListProps } from "./types";

function YearList({
  year,
  selectedDate,
  nextTabIndexDate,
  onSelect,
  onFocusChange,
}: YearListProps) {
  const { yearList, isSelectedYear, handleOnClick, handleKeyDown } =
    useYearList({
      year,
      selectedDate,
      nextTabIndexDate,
      onSelect,
      onFocusChange,
    });

  return (
    <div className="grid grid-cols-3 text-center" onKeyDown={handleKeyDown}>
      {yearList.map((year) => {
        const yearAttributes = isSelectedYear(year);

        return (
          <div className="px-xs" key={year}>
            <div
              className={yearButtonStyle({ isActive: yearAttributes.isActive })}
              role="button"
              tabIndex={yearAttributes.tabIndex}
              onClick={handleOnClick(year)}
              ref={yearAttributes.ref}
              aria-pressed={yearAttributes.isActive}
            >
              {year}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default YearList;
