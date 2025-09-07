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
    }).map((day) => ({
      day,
      displayName: format(day, "d"),
      fullName: format(day, "PPPP", { locale: ptBR }),
      key: day.getTime(),
    }));

    const weekDayNames = Array.from({ length: 7 }).map((_, i) => {
      const weekDay = addDays(firstWeekDay, i);
      return {
        displayName: format(weekDay, "EEEEE", { locale: ptBR }),
        fullName: format(weekDay, "EEEE", { locale: ptBR }),
      };
    });

    return {
      daysList,
      weekDayNames,
    };
  }, [listMonth]);

  const isDayOfMonth = useCallback(
    (day?: Date | null, tabIndexDate?: Date | null) => {
      const isSelectedDay = Boolean(
        selectedDay && day && isSameDay(day, selectedDay),
      );
      const isTodayValidation = Boolean(day && isToday(day));
      const tabIndex =
        day && isSameDay(day, tabIndexDate ?? new Date()) ? 0 : -1;

      return {
        isSameMonth: Boolean(
          day &&
            day.getMonth() === listMonth.getMonth() &&
            day.getFullYear() === listMonth.getFullYear(),
        ),
        isSelectedDay,
        isToday: isTodayValidation,
        tabIndex,
      };
    },
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
