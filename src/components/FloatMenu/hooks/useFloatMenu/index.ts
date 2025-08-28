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
  const [containerSizeState, setContainerSizeState] =
    useState<ElementReferenceProps>();
  const floatContainerStyle = useMemo(() => {
    const elementRect = menuRef.current?.getBoundingClientRect();
    const isEmpty = !menuRef.current || !containerSizeState || !elementRect;

    if (isEmpty) return;

    const { container, windowSize } = containerSizeState;

    const elementHeight = elementRect.height * 1.25;
    const topSpace = container.top;
    const bottomSpace = windowSize.height - container.bottom;
    const freeSpacing = Math.max(topSpace, bottomSpace);
    const maxHeight = Math.min(elementHeight, freeSpacing);
    const topPosition =
      topSpace > bottomSpace
        ? container.top - maxHeight - 10
        : container.bottom;

    const elementWidth = fullContainerWidth
      ? container.width
      : elementRect.width * 1.25;
    const leftSpace = windowSize.width - container.left;
    const rightSpace = windowSize.width - container.right;
    const freeXSpacing = Math.max(leftSpace, rightSpace);
    const maxWidth = Math.min(elementWidth, freeXSpacing);
    const leftPosition =
      leftSpace > rightSpace ? container.left - 10 : rightSpace;
    const canChangeHeight = elementHeight > maxHeight;

    return {
      top: `${topPosition}px`,
      left: `${leftPosition}px`,
      width: `${maxWidth}px`,
      ...(canChangeHeight ? { height: `${maxHeight}px` } : {}),
    };
  }, [containerSizeState, fullContainerWidth]);
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
    onResize();
  }, [isOpenState, onResize]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", onResize);
    }

    setTimeout(
      () => {
        setIsOpenState(!!isOpen);
      },
      isOpen ? 0 : 100,
    );

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen, isOpenState, onResize]);

  return {
    floatContainerStyle,
    menuRef,
    isClosed,
  };
}

export default useFloatMenu;
