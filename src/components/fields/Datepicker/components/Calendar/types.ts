import type { RefObject } from "react";

interface DesktopSelectorProps {
  selectedDate?: Date | null;
  isOpen?: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  onSelect?: (date: Date) => void;
}

export type { DesktopSelectorProps };
