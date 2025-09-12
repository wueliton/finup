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
import { useCallback, useMemo, useRef } from "react";
import useKeyboardNavigate from "../../../../hooks/useKeyboardNavigate";
import type { UseDayListProps } from "./types";

function useDayList({
  selectedDay,
  listMonth,
  nextTabIndexDate,
  disableTabIndex,
  onSelect,
  onFocusChange,
}: UseDayListProps) {
  const { handleKeyDown } = useKeyboardNavigate({
    deltaX: 1,
    deltaY: 7,
    onFocusChange: handleFocusChange,
    onSelect: handleSelect,
  });
  const activeDayFocusRef = useRef<HTMLDivElement>(null);
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
    (day?: Date | null) => {
      const isSelectedDay = Boolean(
        selectedDay && day && isSameDay(day, selectedDay),
      );
      const isTodayValidation = Boolean(day && isToday(day));
      const isSameMonth = Boolean(
        day &&
          day.getMonth() === listMonth.getMonth() &&
          day.getFullYear() === listMonth.getFullYear(),
      );
      const isFocusedElement =
        isSameMonth &&
        day &&
        nextTabIndexDate &&
        isSameDay(day, nextTabIndexDate);
      const tabIndex = isFocusedElement && !disableTabIndex ? 0 : -1;
      const elementRef = isFocusedElement ? activeDayFocusRef : null;

      return {
        isSameMonth,
        isSelectedDay,
        isToday: isTodayValidation,
        tabIndex,
        ref: elementRef,
      };
    },
    [listMonth, selectedDay, nextTabIndexDate, disableTabIndex],
  );

  const handleOnClick =
    (date: Date) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onSelect?.(date);
    };

  function handleFocusChange(delta: number) {
    if (!nextTabIndexDate) return;

    const changedDate = addDays(nextTabIndexDate, delta);
    onFocusChange?.(changedDate);
    setTimeout(() => {
      activeDayFocusRef.current?.focus({ preventScroll: true });
    }, 1);
  }

  function handleSelect() {
    if (!nextTabIndexDate) return;

    onSelect?.(nextTabIndexDate);
  }

  return {
    weekDayNames,
    daysList,
    handleOnClick,
    isDayOfMonth,
    handleKeyDown,
  };
}

export default useDayList;
