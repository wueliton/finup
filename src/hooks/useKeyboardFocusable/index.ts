import { useCallback, useRef, useState, type KeyboardEvent } from "react";
import type { UseKeyboardFocusableProps } from "./types";

function useKeyboardFocusable({
  itemsLength,
  loop,
  onSelect,
}: UseKeyboardFocusableProps) {
  const [highlightedIndexState, setHighlightedIndexState] = useState(-1);
  const itemsRef = useRef<HTMLElement[]>([]);

  const moveCursor = useCallback(
    (delta: number) => {
      const emptyLength = itemsLength === 0;
      if (emptyLength) return;

      setHighlightedIndexState((prev) => {
        const computedNextIndex = prev + delta;

        if (loop) {
          const nextIndex =
            computedNextIndex >= itemsLength
              ? 0
              : computedNextIndex < 0
                ? itemsLength - 1
                : computedNextIndex;
          return nextIndex;
        }

        return Math.max(0, Math.min(computedNextIndex, itemsLength - 1));
      });
    },
    [itemsLength, loop],
  );

  const handleKeyDown = useCallback(
    (onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void) =>
      (event: KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;
        const acceptableKeys = ["ArrowDown", "ArrowUp", "Enter"];
        const ignoreEvent = !acceptableKeys.includes(key);

        if (ignoreEvent) {
          onKeyDown?.(event);
          return;
        }

        event.preventDefault();

        const isArrowDown = key === acceptableKeys[0];
        const isArrowUp = key === acceptableKeys[1];

        if (isArrowDown) {
          moveCursor(1);
          return;
        }

        if (isArrowUp) {
          moveCursor(-1);
          return;
        }

        const canSelectItem =
          highlightedIndexState >= 0 && highlightedIndexState < itemsLength;

        if (canSelectItem) onSelect?.(highlightedIndexState);
      },
    [highlightedIndexState, itemsLength, moveCursor, onSelect],
  );

  function handleMouseEnter(index: number) {
    setHighlightedIndexState(index);
  }

  function handleMouseLeave() {
    setHighlightedIndexState(-1);
  }

  return {
    highlightedIndex: highlightedIndexState,
    itemsRef,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyDown,
  };
}

export default useKeyboardFocusable;
