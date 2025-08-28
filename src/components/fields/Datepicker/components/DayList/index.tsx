import { format } from "date-fns";
import useDayList from "./hooks/useDayList";
import { dayButtonStyle } from "./styles";
import type { DayListProps } from "./types";

function DayList({ selectedDay, listMonth, onSelect }: DayListProps) {
  const { weekDayNames, daysList, handleOnClick, isDayOfMonth } = useDayList({
    selectedDay,
    listMonth,
    onSelect,
  });

  return (
    <div className="grid h-full grid-cols-7 text-center">
      {weekDayNames.map((weekDay, i) => (
        <div className="py-xxs text-sm text-black/40" key={`${weekDay}${i}`}>
          {weekDay}
        </div>
      ))}
      {daysList.map((day) => (
        <div
          className={dayButtonStyle(isDayOfMonth(day))}
          key={day.getTime()}
          role="button"
          onClick={handleOnClick(day)}
        >
          <div>{format(day, "d")}</div>
        </div>
      ))}
    </div>
  );
}

export default DayList;
