import type { RefObject } from "react";

interface UseFloatMenuProps {
  isOpen?: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  fullContainerWidth?: boolean;
}

export type { UseFloatMenuProps };
