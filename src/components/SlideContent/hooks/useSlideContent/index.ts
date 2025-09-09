import useElementSize from "hooks/useElementSize";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import type { UseSlideContentProps } from "./types";

function useSlideContent({ onPageChange }: UseSlideContentProps) {
  const [pageState, setPageState] = useState(0);
  const [dragXOffsetState, setDragXOffsetState] = useState(0);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startMouseDownRef = useRef(0);
  const [disableClickState, setDisableClickState] = useState(false);
  const containerSize = useElementSize<HTMLDivElement>({ ref: containerRef });
  const { prevPageStyle, pageStyle, nextPageStyle } = useMemo(() => {
    const pointerEvents: CSSProperties["pointerEvents"] = disableClickState
      ? "none"
      : "auto";
    const addedStyle = { pointerEvents };

    return {
      prevPageStyle: {
        transform: `translateX(${(pageState + 1) * -100}%)`,
        ...addedStyle,
      },
      pageStyle: {
        transform: `translateX(${pageState * -100}%)`,
        ...addedStyle,
      },
      nextPageStyle: {
        transform: `translateX(${(pageState - 1) * -100}%)`,
        ...addedStyle,
      },
    };
  }, [pageState, disableClickState]);

  const containerStyle = useMemo(() => {
    const containerWidth = containerSize.width * pageState;
    const dragSize = dragXOffsetState * -1;
    const translate = containerWidth + dragSize;

    return {
      transform: `translate3d(${translate}px, 0, 0)`,
      ...(isDraggingState ? {} : { transition: "transform 200ms ease-in-out" }),
    };
  }, [isDraggingState, dragXOffsetState, containerSize.width, pageState]);

  function handleMouseMove(event: MouseEvent) {
    const startClientX = startMouseDownRef.current;
    const clientX = event.clientX;
    const mouseOffset = startClientX - clientX;
    const movementDirection = mouseOffset > 0 ? 1 : -1;
    const movementOffset = Math.min(Math.abs(mouseOffset), containerSize.width);
    const movement = movementOffset * movementDirection;
    const disableClick = Math.abs(startClientX - clientX) > 5;

    if (disableClick) setDisableClickState(true);

    setDragXOffsetState(movement);
  }

  function handleMouseDown(event: ReactMouseEvent) {
    const ignoreClick = event.button !== 0;

    if (ignoreClick) return;

    setIsDraggingState(true);

    startMouseDownRef.current = event.clientX;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseUp(event: MouseEvent) {
    setIsDraggingState(false);

    const startClientX = startMouseDownRef.current;
    const clientX = event.clientX;

    const mouseOffset = startClientX - clientX;
    const halfOfPageSize = containerSize.width / 2;
    const containerXOffset = Math.abs(mouseOffset);
    const isGreatherThanPageHalf = containerXOffset >= halfOfPageSize;
    const direction = mouseOffset > 0 ? -1 : 1;
    const pageSize = isGreatherThanPageHalf ? pageState + direction : pageState;

    if (isGreatherThanPageHalf) onPageChange?.(direction * -1);

    setDragXOffsetState(0);
    setPageState(pageSize);

    setTimeout(() => setDisableClickState(false), 100);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function imperativeHandle() {
    return {
      nextPage: () => {
        setPageState((prev) => prev - 1);
        onPageChange?.(1);
      },
      previousPage: () => {
        setPageState((prev) => prev + 1);
        onPageChange?.(-1);
      },
      element: containerRef.current,
    };
  }

  return {
    isDragging: isDraggingState,
    containerRef,
    containerStyle,
    prevPageStyle,
    pageStyle,
    nextPageStyle,
    handleMouseDown,
    imperativeHandle,
  };
}

export default useSlideContent;
