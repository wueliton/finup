import {
  eachMonthOfInterval,
  endOfYear,
  getMonth,
  getYear,
  setMonth,
  setYear,
  startOfYear,
} from "date-fns";
import { useCallback, useMemo } from "react";
import type { UseMonthListProps } from "./types";

function useMonthList({ month, selectedDate, onSelect }: UseMonthListProps) {
  const months = useMemo(
    () =>
      eachMonthOfInterval({
        start: startOfYear(month),
        end: endOfYear(month),
      }),
    [month],
  );

  const isSelectedMonth = useCallback(
    (date: Date) =>
      Boolean(
        selectedDate &&
          selectedDate.getMonth() === date.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear(),
      ),
    [selectedDate],
  );

  const handleOnClick = (date: Date) => () => {
    const month = getMonth(date);
    const year = getYear(date);
    const selected = setYear(setMonth(selectedDate ?? date, month), year);
    onSelect?.(selected);
  };

  return {
    months,
    isSelectedMonth,
    handleOnClick,
  };
}

export default useMonthList;
