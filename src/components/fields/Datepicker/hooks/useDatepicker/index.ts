import { format, isValid, parse } from "date-fns";
import useFocusTrap from "hooks/useFocusTrap";
import useMediaQuery from "hooks/useMediaQuery";
import { useCallback, useEffect, useState } from "react";
import type { ComponentEvent } from "types/component-event";
import type { UseDatepickerProps } from "./types";

function useDatepicker({ onChange, onBlur, value }: UseDatepickerProps) {
  const [inputValueState, setInpuValueState] = useState<string>();
  const [selectedState, setSelectedState] = useState<Date | null>();
  const [isOpenState, setIsOpenState] = useState(false);
  const { containerRef } = useFocusTrap<HTMLDivElement>(isOpenState);

  const isMobile = useMediaQuery({ maxWidth: 680 });

  function handleSelect(date: Date) {
    setSelectedState(date);
    setInpuValueState(format(date, "dd/MM/y"));
    handleOnClose();
  }

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

  function handleOpenCalendar() {
    setIsOpenState(true);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const canOpen = event.key === " " && !isOpenState;

    if (canOpen) {
      event.preventDefault();
      handleOpenCalendar();
    }
  }

  function handleClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const isChildOfContainer = containerRef.current?.contains(targetElement);

    if (isChildOfContainer) return;

    handleOnClose();
  }

  function handleEscPressed(event: KeyboardEvent) {
    const ignoreKey = event.key !== "Escape";

    if (ignoreKey) return;

    handleOnClose();
  }

  function handleOnClose() {
    setIsOpenState(false);
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
    selectedDate: selectedState,
    inputValue: inputValueState,
    isMobile,
    isOpen: isOpenState,
    containerRef,
    handleSelect,
    handleOnChange,
    handleOnBlur,
    handleOpenCalendar,
    handleKeyDown,
    handleOnClose,
  };
}

export default useDatepicker;
