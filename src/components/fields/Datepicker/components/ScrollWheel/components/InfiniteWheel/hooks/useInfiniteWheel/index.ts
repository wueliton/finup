import { useMemo, useRef, useState } from "react";
import {
  DEFAULT_OFFSET,
  ELEMENT_HEIGHT,
  LIST_LENGTH,
} from "../../../../constants";
import type { UseInfiniteWheelProps } from "./types";

function useInfiniteWheel({
  itens,
  name,
  selected = 0,
  onChange,
}: UseInfiniteWheelProps) {
  const [clientYState, setClientYState] = useState(selected * ELEMENT_HEIGHT);
  const selectedItem = useMemo(
    () => Math.floor(clientYState / ELEMENT_HEIGHT),
    [clientYState],
  );
  const [isDraggingState, setIsDraggingState] = useState(false);
  const startEventRef = useRef({
    clientY: 0,
    lastClientY: 0,
    startEvent: 0,
  });
  const listLength = itens.length;
  const listItens = useMemo(() => {
    return Array.from({ length: LIST_LENGTH }, (_, i) => {
      const isSelected = i === 22;
      return {
        text: itens[Math.abs(i + selectedItem - 22) % listLength],
        key: `${name}-${selectedItem + i}`,
        scrollTo: i + selectedItem - 22,
        isSelected,
        tabIndex: isSelected ? 0 : -1,
      };
    });
  }, [selectedItem, itens, name, listLength]);

  const listStyle = useMemo(() => {
    return {
      marginTop: `${selectedItem * ELEMENT_HEIGHT - DEFAULT_OFFSET}px`,
      transform: `translate3d(0, ${clientYState * -1 - DEFAULT_OFFSET}px, 0)`,
      transition: isDraggingState
        ? ""
        : "transform 1000ms cubic-bezier(0.19, 1, 0.22, 1)",
    };
  }, [clientYState, selectedItem, isDraggingState]);

  function handleStart(clientY: number) {
    startEventRef.current = {
      clientY,
      lastClientY: clientYState,
      startEvent: Date.now(),
    };
    setIsDraggingState(true);
  }

  function handleMove(clientY: number) {
    const offsetY =
      startEventRef.current.clientY -
      clientY +
      startEventRef.current.lastClientY;
    setClientYState(offsetY);
  }

  function handleEnd(clientY: number) {
    setIsDraggingState(false);

    const now = Date.now();
    const dt = now - startEventRef.current.startEvent;
    const dy = startEventRef.current.clientY - clientY;
    const velocity = dy / dt;
    const scrollY =
      startEventRef.current.lastClientY + dy * (1 + Math.abs(velocity));
    const selectedItem = Math.round(scrollY / ELEMENT_HEIGHT);
    setClientYState(selectedItem * ELEMENT_HEIGHT);
    onChange?.(selectedItem % listLength);
  }

  function handleMouseMove(event: MouseEvent) {
    handleMove(event.clientY);
  }

  function handleMouseUp(event: MouseEvent) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    event.preventDefault();

    handleEnd(event.clientY);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    handleStart(event.clientY);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    const touch = event.touches.item(0);
    handleMove(touch?.clientY || 0);
  }

  function handleTouchEnd(event: TouchEvent) {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);

    const touch = event.changedTouches.item(0);
    handleEnd(touch?.clientY || 0);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches.item(0);
    handleStart(touch.clientY);

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  }

  function handleOnClick(scrollTo: number) {
    return () => setClientYState(scrollTo * ELEMENT_HEIGHT);
  }

  return {
    listItens,
    listStyle,
    handleMouseDown,
    handleTouchStart,
    handleOnClick,
  };
}

export default useInfiniteWheel;
