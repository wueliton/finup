import useKeyboardFocusable from "hooks/useKeyboardFocusable";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import getComponentEvent from "utils/component-event";
import type { UseAutocompleteProps } from "./types";

function useAutocomplete<Data extends object>({
  data,
  value,
  onChange,
  groupBy,
}: UseAutocompleteProps<Data>) {
  const [isOpenState, setIsOpenState] = useState(false);
  const [selectedState, setSelectedState] = useState<Data | null>();
  const containerRef = useRef<HTMLDivElement>(null);
  const hasSelected = Boolean(selectedState);
  const autocompleteId = useId();
  const groupedData = useMemo(() => {
    if (!groupBy) return null;
    return data.reduce(
      (acc, item) => {
        const groupKey = groupBy(item) as string;
        const addKeyOnAcc = !(groupKey in acc);

        if (addKeyOnAcc) {
          acc[groupKey] = [];
        }

        acc[groupKey].push(item);
        return acc;
      },
      {} as Record<string, Data[]>,
    );
  }, [groupBy, data]);
  const { highlightedIndex, itemsRef, handleKeyDown } = useKeyboardFocusable({
    itemsLength: data.length,
    loop: true,
    onSelect: onSelect,
  });

  const checkIsActive = useCallback(
    (item: Data) => item === selectedState,
    [selectedState],
  );

  function handleClickOption(data: Data) {
    return () => {
      setSelectedState(data);
      setIsOpenState(false);
      onChange?.(getComponentEvent(data));
    };
  }

  function onSelect(index: number) {
    setSelectedState(data.at(index));
    setIsOpenState(false);
  }

  function handleRemoveSelected() {
    setSelectedState(null);
    const event = getComponentEvent(null);
    onChange?.(event);
    containerRef.current?.querySelector("input")?.focus();
  }

  function handleClick() {
    setIsOpenState(true);
  }

  function handleDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const isChildOfContainer = containerRef.current?.contains(targetElement);
    if (isChildOfContainer) return;

    setIsOpenState(false);
  }

  function handleEscPressed(event: KeyboardEvent) {
    const ignoreKey = event.key !== "Escape";

    if (ignoreKey) return;

    setIsOpenState(false);
  }

  function handleSpaceDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const canOpen = event.key === " " && !isOpenState;

    if (canOpen) {
      setIsOpenState(true);
      event.preventDefault();
    }
  }

  const checkIsFocusedItem = useCallback(
    (index: number) => highlightedIndex === index,
    [highlightedIndex],
  );

  useEffect(() => {
    setSelectedState(value);
  }, [value]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscPressed);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleEscPressed);
    };
  }, []);

  return {
    containerRef,
    selected: selectedState,
    isOpen: isOpenState,
    hasSelected,
    groupedData,
    itemsRef,
    autocompleteId,
    handleRemoveSelected,
    handleClick,
    handleKeyDown: handleKeyDown(handleSpaceDown),
    handleClickOption,
    checkIsActive,
    checkIsFocusedItem,
  };
}

export default useAutocomplete;
