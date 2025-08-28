import type { RefObject } from "react";

interface FloatMenuProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
  fullContainerWidth?: boolean;
}

interface ElementReferenceProps {
  container: DOMRect;
  windowSize: DOMRect;
}

export type { ElementReferenceProps, FloatMenuProps };
