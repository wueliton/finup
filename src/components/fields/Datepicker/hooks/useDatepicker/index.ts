import { addMonths, addYears, format, getYear, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import useFocusTrap from "hooks/useFocusTrap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentEvent } from "types/component-event";
import type { SlideContentHandles } from "../../../../SlideContent/types";
import { CalendarSelectionEnum } from "../../contants";
import type { UseDatepickerProps } from "./types";

function useDatepicker({ onChange, onBlur, value }: UseDatepickerProps) {
  const [inputValueState, setInpuValueState] = useState<string>();
  const [selectedState, setSelectedState] = useState<Date | null>();
  const [calendarState, setCalendarState] = useState({
    isOpen: false,
    date: selectedState ?? new Date(),
    selection: CalendarSelectionEnum.DAY,
    direction: 1,
  });
  const { containerRef } = useFocusTrap<HTMLDivElement>(calendarState.isOpen);
  const showSelectMonthOrYear =
    calendarState.selection !== CalendarSelectionEnum.DAY;
  const showYearSelection =
    calendarState.selection === CalendarSelectionEnum.YEAR;
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

  const handleSelect = useCallback(
    (type: CalendarSelectionEnum) => (date: Date) => {
      setCalendarState((prev) => {
        const isDay = type === CalendarSelectionEnum.DAY;
        const isOpen = !isDay;
        const selection = isDay ? prev.selection : prev.selection - 1;

        if (isDay) {
          setSelectedState(date);
          setInpuValueState(format(date, "dd/MM/y"));
          containerRef.current?.querySelector("input")?.focus();
        }

        return {
          ...prev,
          isOpen,
          date,
          selection,
        };
      });
    },
    [],
  );

  const handleOnChangeDispatch = useCallback(
    (date?: Date | null) => {
      onChange?.({
        target: {
          value: date,
        },
      });
    },
    [onChange],
  );

  const handlePageChange = useCallback(
    (type: CalendarSelectionEnum) => (page: number) => {
      const sumValue = type === CalendarSelectionEnum.YEAR ? 12 : 1;
      const dateAmount = sumValue * page;
      const manageFn =
        type === CalendarSelectionEnum.DAY
          ? addMonths
          : type === CalendarSelectionEnum.MONTH
            ? addYears
            : addYears;

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

  function handleOpenCalendar() {
    setCalendarState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  }

  function handleClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const isChildOfContainer = containerRef.current?.contains(targetElement);

    if (isChildOfContainer) return;

    setCalendarState((prev) => {
      return {
        ...prev,
        selection: CalendarSelectionEnum.DAY,
        isOpen: false,
      };
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const canOpen = event.key === " " && !calendarState.isOpen;

    if (canOpen) {
      event.preventDefault();
      setCalendarState((prev) => ({
        ...prev,
        isOpen: true,
      }));
    }
  }

  function handleEscPressed(event: KeyboardEvent) {
    const ignoreKey = event.key !== "Escape";

    if (ignoreKey) return;

    setCalendarState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }

  function getValidDate(value?: string | null) {
    if (!value) return null;

    const date = new Date(value);
    const isValidDate = isValid(date);
    return isValidDate ? date : null;
  }

  function handleOnChange(event: ComponentEvent) {
    setInpuValueState(event.target.value as string);
  }

  function handleOnBlur(event: React.FocusEvent<HTMLInputElement, Element>) {
    const value = event.target.value;
    const emptyValue = !value;

    if (emptyValue) {
      onBlur?.(event);
      setSelectedState(null);
      return;
    }

    const valueToDate = parse(value, "dd/MM/yyyy", new Date());
    const isValidDate = isValid(valueToDate);
    const validDate = isValidDate ? valueToDate : new Date();

    const formattedDate = format(validDate, "dd/MM/y");
    event.target.value = formattedDate;
    onBlur?.(event);
  }

  useEffect(() => {
    handleOnChangeDispatch(selectedState);
  }, [selectedState, handleOnChangeDispatch]);

  useEffect(() => {
    const validDate = getValidDate(String(value));
    const newDisplayValue = validDate ? format(validDate, "dd/MM/y") : "";

    setInpuValueState(newDisplayValue);
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscPressed);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscPressed);
    };
  }, []);

  return {
    containerRef,
    selectedDate: selectedState,
    calendar: calendarState,
    pageLabel,
    showSelectMonthOrYear,
    showYearSelection,
    inputValue: inputValueState,
    handleOpenCalendar,
    handleSelectionType,
    handlePrevious,
    handleNext,
    handlePageChange,
    handleAddRef,
    handleSelect,
    handleKeyDown,
    handleOnChange,
    handleOnBlur,
  };
}

export default useDatepicker;
