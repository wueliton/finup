import { setYear } from "date-fns";
import { useCallback, useMemo } from "react";
import type { UseYearListProps } from "./types";

function useYearList({ year, selectedDate, onSelect }: UseYearListProps) {
  const yearList = useMemo(() => {
    const page = Math.floor((year.getFullYear() - 1900) / 12);
    const start = 1900 + page * 12;
    return Array.from({ length: 12 }, (_, i) => start + i);
  }, [year]);
  const isSelectedYear = useCallback(
    (year: number) => {
      return Boolean(selectedDate && year === selectedDate.getFullYear());
    },
    [selectedDate],
  );

  const handleOnClick = (year: number) => () => {
    onSelect?.(setYear(selectedDate ?? new Date(), year));
  };

  return {
    yearList,
    isSelectedYear,
    handleOnClick,
  };
}

export default useYearList;
