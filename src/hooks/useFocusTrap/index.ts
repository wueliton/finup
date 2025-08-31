import { useEffect, useRef } from "react";
import { focusableElementsSelector, KEYCODE_TAB } from "./constants";

function useFocusTrap<T extends HTMLElement>(isOpen?: boolean) {
  const containerRef = useRef<T>(null);

  function handleKeyDown(e: KeyboardEvent) {
    const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;
    const anotherKeyPressed = !isTabPressed;

    if (anotherKeyPressed) return;

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
    const isLastFocusableEl = document.activeElement === firstFocusableEl;
    const isFirstFocusableEl = document.activeElement === lastFocusableEl;

    if (e.shiftKey) {
      if (isLastFocusableEl) {
        lastFocusableEl?.focus();
        e.preventDefault();
      }

      return;
    }

    if (isFirstFocusableEl) {
      firstFocusableEl?.focus();
      e.preventDefault();
    }

    if (isNotChildOfContainer) {
      firstFocusableEl?.focus();
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return {
    containerRef,
  };
}

export default useFocusTrap;
