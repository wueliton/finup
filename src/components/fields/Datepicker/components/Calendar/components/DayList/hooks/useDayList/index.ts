import {
  addDays,
  eachDayOfInterval,
  format,
  isSameDay,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useMemo } from "react";
import type { UseDayListProps } from "./types";

function useDayList({ selectedDay, listMonth, onSelect }: UseDayListProps) {
  const { daysList, weekDayNames } = useMemo(() => {
    const firstDayOfMonth = startOfMonth(listMonth);
    const firstWeekDay = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 });
    const lastCalendarDay = addDays(firstWeekDay, 41);
    const daysList = eachDayOfInterval({
      start: firstWeekDay,
      end: lastCalendarDay,
    });

    const weekDayNames = Array.from({ length: 7 }).map((_, i) =>
      format(addDays(firstWeekDay, i), "EEEEE", { locale: ptBR }),
    );

    return {
      daysList,
      weekDayNames,
    };
  }, [listMonth]);

  const isDayOfMonth = useCallback(
    (day?: Date | null) => ({
      isSameMonth: Boolean(
        day &&
          day.getMonth() === listMonth.getMonth() &&
          day.getFullYear() === listMonth.getFullYear(),
      ),
      isSelectedDay: Boolean(selectedDay && day && isSameDay(day, selectedDay)),
      isToday: Boolean(day && isToday(day)),
    }),
    [listMonth, selectedDay],
  );

  const handleOnClick = (date: Date) => () => {
    onSelect?.(date);
  };

  return {
    weekDayNames,
    daysList,
    handleOnClick,
    isDayOfMonth,
  };
}

export default useDayList;
