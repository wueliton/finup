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
    return Array.from({ length: LIST_LENGTH }, (_, i) => ({
      text: itens[Math.abs(i + selectedItem - 22) % listLength],
      key: `${name}-${selectedItem + i}`,
    }));
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

  function handleMouseMove(event: MouseEvent) {
    const clientY =
      startEventRef.current.clientY -
      event.clientY +
      startEventRef.current.lastClientY;
    setClientYState(clientY);
  }

  function handleMouseUp(event: MouseEvent) {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    event.preventDefault();

    setIsDraggingState(false);

    const now = Date.now();
    const dt = now - startEventRef.current.startEvent;
    const dy = startEventRef.current.clientY - event.clientY;
    const velocity = dy / dt;
    const scrollY =
      startEventRef.current.lastClientY + dy * (1 + Math.abs(velocity));
    const selectedItem = Math.round(scrollY / ELEMENT_HEIGHT);
    setClientYState(selectedItem * ELEMENT_HEIGHT);
    onChange?.(selectedItem % listLength);
  }

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    startEventRef.current = {
      clientY: event.clientY,
      lastClientY: clientYState,
      startEvent: Date.now(),
    };
    event.preventDefault();
    setIsDraggingState(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  return {
    listItens,
    listStyle,
    handleMouseDown,
  };
}

export default useInfiniteWheel;
