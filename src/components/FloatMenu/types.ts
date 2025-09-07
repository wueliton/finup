import type { RefObject } from "react";

interface FloatMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  fullContainerWidth?: boolean;
}

interface ElementReferenceProps {
  container: DOMRect;
  windowSize: DOMRect;
}

export type { ElementReferenceProps, FloatMenuProps };
