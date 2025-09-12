import { addYears, setYear } from "date-fns";
import { useCallback, useMemo, useRef } from "react";
import useKeyboardNavigate from "../../../../hooks/useKeyboardNavigate";
import type { UseYearListProps } from "./types";

function useYearList({
  year,
  selectedDate,
  nextTabIndexDate,
  onSelect,
  onFocusChange,
}: UseYearListProps) {
  const { handleKeyDown } = useKeyboardNavigate({
    deltaX: 1,
    deltaY: 3,
    onFocusChange: handleFocusChange,
    onSelect: handleSelect,
  });
  const activeYearFocusRef = useRef<HTMLDivElement>(null);
  const yearList = useMemo(() => {
    const page = Math.floor((year.getFullYear() - 1900) / 12);
    const start = 1900 + page * 12;
    return Array.from({ length: 12 }, (_, i) => start + i);
  }, [year]);
  const isSelectedYear = useCallback(
    (year: number) => {
      const isSelectedYear = Boolean(
        selectedDate && year === selectedDate.getFullYear(),
      );
      const isFocusedElement =
        nextTabIndexDate && year === nextTabIndexDate.getFullYear();
      const tabIndex = isFocusedElement ? 0 : -1;
      const elementRef = isFocusedElement ? activeYearFocusRef : null;

      return {
        isActive: isSelectedYear,
        tabIndex,
        ref: elementRef,
      };
    },
    [selectedDate, nextTabIndexDate],
  );

  const handleOnClick = (year: number) => () => {
    onSelect?.(setYear(selectedDate ?? new Date(), year));
  };

  function handleFocusChange(delta: number) {
    if (!nextTabIndexDate) return;

    const changedDate = addYears(nextTabIndexDate, delta);
    onFocusChange?.(changedDate);
    setTimeout(() => {
      activeYearFocusRef.current?.focus({ preventScroll: true });
    }, 1);
  }

  function handleSelect() {
    if (!nextTabIndexDate) return;

    onSelect?.(nextTabIndexDate);
  }

  return {
    yearList,
    isSelectedYear,
    handleOnClick,
    handleKeyDown,
  };
}

export default useYearList;
