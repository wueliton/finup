import type { ElementReferenceProps } from "components/FloatMenu/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { UseFloatMenuProps } from "./types";

function useFloatMenu({
  isOpen,
  containerRef,
  fullContainerWidth,
}: UseFloatMenuProps) {
  const [isOpenState, setIsOpenState] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const originalSizeRef = useRef<DOMRect>(null);
  const [containerSizeState, setContainerSizeState] =
    useState<ElementReferenceProps>();

  const floatContainerStyle = useMemo(() => {
    const elementRect = originalSizeRef.current;
    const isEmpty = !menuRef.current || !elementRect || !containerSizeState;

    if (isEmpty) return;

    const { container, windowSize } = containerSizeState;

    const elementHeight = elementRect.height * 1.25;
    const elementWidth = elementRect.width * 1.25;
    const freeSpaceRight = windowSize.width - container.left;
    const freeSpaceBottom = windowSize.height - container.bottom;
    const placementPosition = {
      top: Math.max(container.top - elementHeight - 10, 0),
      bottom: container.bottom,
      left: container.left,
      right: container.right - elementWidth,
    };
    const placementHeight = {
      top: Math.min(container.top - 15, elementHeight),
      bottom: Math.min(
        windowSize.height - container.bottom - 15,
        elementHeight,
      ),
    };
    const placementY =
      freeSpaceBottom >= elementHeight || freeSpaceBottom > container.top
        ? "bottom"
        : "top";
    const placementX = freeSpaceRight > elementWidth ? "left" : "right";
    const height = placementHeight[placementY];
    const top = placementPosition[placementY];
    const left =
      elementWidth > windowSize.width ? 15 : placementPosition[placementX];
    const maxWidthSizes = [windowSize.width - 30, elementWidth];
    if (fullContainerWidth) maxWidthSizes.push(container.width);
    const maxWidth = Math.min(...maxWidthSizes);
    const aditionalProperties = fullContainerWidth
      ? { width: `${container.width}px` }
      : { maxWidth: `${maxWidth}px` };

    return {
      top: `${top}px`,
      left: `${left}px`,
      height: `${height}px`,
      ...aditionalProperties,
    };
  }, [fullContainerWidth, containerSizeState]);
  const isClosed = !isOpenState;

  const onResize = useCallback(() => {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    setContainerSizeState({
      container: containerRect,
      windowSize: new DOMRect(0, 0, window.innerWidth, window.innerHeight),
    });
  }, [containerRef]);

  useEffect(() => {
    if (isOpen) {
      originalSizeRef.current =
        menuRef.current?.getBoundingClientRect() ?? null;
      onResize();
    }

    setTimeout(
      () => {
        setIsOpenState(!!isOpen);
      },
      isOpen ? 0 : 100,
    );
  }, [isOpen, isOpenState, onResize]);

  useEffect(() => {
    window.addEventListener("resize", onResize, { passive: true });

    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return {
    floatContainerStyle,
    menuRef,
    isClosed,
  };
}

export default useFloatMenu;
