import useDayList from "./hooks/useDayList";
import { dayButtonStyle } from "./styles";
import type { DayListProps } from "./types";

function DayList({
  selectedDay,
  listMonth,
  nextTabIndexDate,
  disableTabIndex,
  onSelect,
  onFocusChange,
}: DayListProps) {
  const { weekDayNames, daysList, handleOnClick, isDayOfMonth, handleKeyDown } =
    useDayList({
      selectedDay,
      listMonth,
      nextTabIndexDate,
      disableTabIndex,
      onSelect,
      onFocusChange,
    });

  return (
    <div
      className="grid h-full grid-cols-7 text-center"
      onKeyDown={handleKeyDown}
    >
      {weekDayNames.map((weekDay, i) => (
        <div className="py-xxs text-sm text-black/40" key={`${weekDay}${i}`}>
          <abbr title={weekDay.fullName}>{weekDay.displayName}</abbr>
        </div>
      ))}
      {daysList.map(({ day, key, displayName, fullName }) => {
        const dayAttributes = isDayOfMonth(day);

        return (
          <div className={dayButtonStyle(dayAttributes)} key={key}>
            <div
              role="button"
              onClick={handleOnClick(day)}
              aria-label={fullName}
              aria-pressed={dayAttributes.isSelectedDay}
              tabIndex={dayAttributes.tabIndex}
              ref={dayAttributes.ref}
            >
              {displayName}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DayList;
