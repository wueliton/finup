import {
  addMonths,
  eachMonthOfInterval,
  endOfYear,
  getMonth,
  getYear,
  isSameDay,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { useCallback, useMemo, useRef } from "react";
import useKeyboardNavigate from "../../../../hooks/useKeyboardNavigate";
import type { UseMonthListProps } from "./types";

function useMonthList({
  month,
  selectedDate,
  nextTabIndexDate,
  disableTabIndex,
  onSelect,
  onFocusChange,
}: UseMonthListProps) {
  const { handleKeyDown } = useKeyboardNavigate({
    deltaX: 1,
    deltaY: 3,
    onFocusChange: handleFocusChange,
    onSelect: handleSelect,
  });
  const activeMonthFocusRef = useRef<HTMLDivElement>(null);
  const months = useMemo(
    () =>
      eachMonthOfInterval({
        start: startOfYear(month),
        end: endOfYear(month),
      }),
    [month],
  );

  const isSelectedMonth = useCallback(
    (date: Date) => {
      const firstDayMonth = startOfMonth(date);
      const isSelectedMonth =
        selectedDate && isSameDay(firstDayMonth, startOfMonth(selectedDate));
      const isFocusedElement =
        nextTabIndexDate &&
        isSameDay(firstDayMonth, startOfMonth(nextTabIndexDate));
      const tabIndex = isFocusedElement && !disableTabIndex ? 0 : -1;
      const elementRef = isFocusedElement ? activeMonthFocusRef : null;

      return {
        isActive: Boolean(isSelectedMonth),
        tabIndex,
        ref: elementRef,
      };
    },
    [selectedDate, nextTabIndexDate, disableTabIndex],
  );

  const handleOnClick = (date: Date) => () => {
    const month = getMonth(date);
    const year = getYear(date);
    const selected = setYear(setMonth(selectedDate ?? date, month), year);
    onSelect?.(selected);
  };

  function handleFocusChange(delta: number) {
    if (!nextTabIndexDate) return;

    const changedDate = addMonths(nextTabIndexDate, delta);
    onFocusChange?.(changedDate);
    setTimeout(() => {
      activeMonthFocusRef.current?.focus({ preventScroll: true });
    }, 1);
  }

  function handleSelect() {
    if (!nextTabIndexDate) return;

    onSelect?.(nextTabIndexDate);
  }

  return {
    months,
    isSelectedMonth,
    handleOnClick,
    handleKeyDown,
  };
}

export default useMonthList;
