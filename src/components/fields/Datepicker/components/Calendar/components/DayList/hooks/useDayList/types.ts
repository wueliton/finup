interface UseDayListProps {
  selectedDay?: Date | null;
  listMonth: Date;
  nextTabIndexDate?: Date | null;
  onSelect?: (day: Date) => void;
  onFocusChange?: (date: Date) => void;
}

export type { UseDayListProps };
