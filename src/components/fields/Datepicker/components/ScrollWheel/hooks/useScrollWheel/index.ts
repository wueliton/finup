import { CalendarSelectionEnum } from "components/fields/Datepicker/contants";
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfYear,
  format,
  getDate,
  getMonth,
  getYear,
  setDate,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo, useState } from "react";
import type { useScrollWheelProps } from "./types";

function useScrollWheel({ initialDate, onSelect }: useScrollWheelProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate ?? new Date());
  const { monthList, yearList } = useMemo(() => {
    const today = new Date();
    return {
      monthList: eachMonthOfInterval({
        start: startOfYear(today),
        end: endOfYear(today),
      }).map((month) => format(month, "MMMM", { locale: ptBR })),
      yearList: Array.from({ length: 3000 }, (_, i) => i),
    };
  }, []);
  const dayList = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfMonth(selectedDate),
        end: endOfMonth(selectedDate),
      }).map((date) => format(date, "dd")),
    [selectedDate],
  );
  const { selectedDay, selectedMonth, selectedYear } = useMemo(
    () => ({
      selectedDay: getDate(selectedDate) - 1,
      selectedMonth: getMonth(selectedDate),
      selectedYear: getYear(selectedDate),
    }),
    [selectedDate],
  );

  const handleChange = (type: CalendarSelectionEnum) => (selected: number) => {
    if (type === CalendarSelectionEnum.MONTH) {
      setSelectedDate(setMonth(selectedDate, selected));
      return;
    }
    if (type === CalendarSelectionEnum.YEAR) {
      setSelectedDate(setYear(selectedDate, selected));
      return;
    }
    setSelectedDate(setDate(selectedDate, selected + 1));
  };

  function handleSelect() {
    onSelect?.(selectedDate);
  }

  return {
    dayList,
    monthList,
    yearList,
    selectedDay,
    selectedMonth,
    selectedYear,
    handleChange,
    handleSelect,
  };
}

export default useScrollWheel;
