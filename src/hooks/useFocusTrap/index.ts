import { useCallback, useEffect, useRef } from "react";
import { focusableElementsSelector, KEYCODE_TAB } from "./constants";
import { focusTrapManager } from "./FocusTrap.class";

function useFocusTrap<T extends HTMLElement>(isOpen?: boolean) {
  const containerRef = useRef<T>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isTopElement = focusTrapManager.isTop(containerRef.current);
      const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;
      const ignoreEvent = !isTabPressed || !isTopElement || !isOpen;

      if (ignoreEvent) return;

      const elements = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(
          focusableElementsSelector,
        ) ?? [],
      );

      const firstFocusableEl = elements?.at(0);

      const lastFocusableEl = elements?.at(-1);
      const isNotChildOfContainer =
        !document.activeElement ||
        !containerRef.current?.contains(document.activeElement);
      const isLastFocusableEl = document.activeElement === lastFocusableEl;
      const isFirstFocusableEl = document.activeElement === firstFocusableEl;

      if (e.shiftKey) {
        if (isNotChildOfContainer) {
          lastFocusableEl?.focus();
          e.preventDefault();
          return;
        }

        if (isFirstFocusableEl) {
          lastFocusableEl?.focus();
          e.preventDefault();
        }

        return;
      }

      if (isLastFocusableEl) {
        firstFocusableEl?.focus();
        e.preventDefault();
        return;
      }

      if (isNotChildOfContainer) {
        firstFocusableEl?.focus();
        e.preventDefault();
      }
    },
    [isOpen],
  );

  const addRef = (element: T) => {
    containerRef.current = element;
    focusTrapManager.add(element);
  };

  useEffect(() => {
    const container = containerRef.current;
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      focusTrapManager.remove(container);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  return {
    containerRef: addRef,
  };
}

export default useFocusTrap;
