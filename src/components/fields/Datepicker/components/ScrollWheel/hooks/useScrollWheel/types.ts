interface useScrollWheelProps {
  initialDate?: Date | null;
  isOpen?: boolean;
  onSelect?: (date: Date) => void;
}

export type { useScrollWheelProps };
