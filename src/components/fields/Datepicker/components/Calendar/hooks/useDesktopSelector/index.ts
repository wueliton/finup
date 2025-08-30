import { CalendarSelectionEnum } from "components/fields/Datepicker/contants";
import type { SlideContentHandles } from "components/SlideContent/types";
import { addMonths, addYears, format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useCallback, useMemo, useRef, useState } from "react";
import type { UseDesktopSelectorProps } from "./types";

function useDesktopSelector({
  selectedDate,
  onSelect,
}: UseDesktopSelectorProps) {
  const [calendarState, setCalendarState] = useState({
    date: selectedDate ?? new Date(),
    selection: CalendarSelectionEnum.DAY,
    direction: 1,
  });
  const pageLabel = useMemo(() => {
    const selectedType = calendarState.selection;
    const isDaySelected = selectedType === CalendarSelectionEnum.DAY;
    const isMonthSelected = selectedType === CalendarSelectionEnum.MONTH;
    const year = getYear(calendarState.date);
    const yearPage = Math.floor((year - 1900) / 12);
    const start = 1900 + yearPage * 12;
    const end = start + 11;

    if (isDaySelected)
      return format(calendarState.date, "MMMM y", { locale: ptBR });
    if (isMonthSelected)
      return format(calendarState.date, "y", { locale: ptBR });
    return `${start} - ${end}`;
  }, [calendarState]);
  const slidersRef = useRef<(SlideContentHandles | null)[]>([]);
  const showSelectMonthOrYear =
    calendarState.selection !== CalendarSelectionEnum.DAY;
  const showYearSelection =
    calendarState.selection === CalendarSelectionEnum.YEAR;

  const handleSelect = useCallback(
    (type: CalendarSelectionEnum) => (date: Date) => {
      setCalendarState((prev) => {
        const isDay = type === CalendarSelectionEnum.DAY;
        const isOpen = !isDay;
        const selection = isDay ? prev.selection : prev.selection - 1;

        if (isDay) {
          onSelect?.(date);
        }

        return {
          ...prev,
          isOpen,
          date,
          selection,
        };
      });
    },
    [onSelect],
  );

  const handlePageChange = useCallback(
    (type: CalendarSelectionEnum) => (page: number) => {
      const sumValue = type === CalendarSelectionEnum.YEAR ? 12 : 1;
      const dateAmount = sumValue * page;
      const manageFn =
        type === CalendarSelectionEnum.DAY ? addMonths : addYears;

      setCalendarState((prev) => ({
        ...prev,
        date: manageFn(prev.date, dateAmount),
      }));
    },
    [],
  );

  const handleAddRef = useCallback((index: CalendarSelectionEnum) => {
    return (el: SlideContentHandles | null) => {
      slidersRef.current[index] = el;
    };
  }, []);

  function handlePrevious() {
    slidersRef.current[calendarState.selection]?.previousPage();
  }

  function handleNext() {
    slidersRef.current[calendarState.selection]?.nextPage();
  }

  function handleSelectionType() {
    setCalendarState(({ direction, selection, ...prev }) => {
      if (direction > 0 && selection === CalendarSelectionEnum.YEAR)
        direction = -1;

      if (direction < 0 && selection === CalendarSelectionEnum.DAY)
        direction = 1;

      return {
        ...prev,
        selection: selection + direction,
        direction: direction,
      };
    });
  }

  return {
    calendar: calendarState,
    pageLabel,
    showSelectMonthOrYear,
    showYearSelection,
    handleSelectionType,
    handlePrevious,
    handleNext,
    handlePageChange,
    handleAddRef,
    handleSelect,
  };
}

export default useDesktopSelector;
