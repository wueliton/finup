interface ScrollWheelProps {
  selectedDate?: Date | null;
  isOpen?: boolean;
  onSelect?: (date: Date) => void;
  onCancel?: () => void;
}

export type { ScrollWheelProps };
